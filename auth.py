from fastapi import APIRouter
from fastapi.responses import RedirectResponse, JSONResponse
from config import GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI
import httpx, datetime
from models import Credential
from database import AsyncSessionLocal
from sqlalchemy.future import select

router = APIRouter()

@router.get("/auth/google")
async def auth_google():
    auth_url = (
        "https://accounts.google.com/o/oauth2/v2/auth"
        f"?client_id={GOOGLE_CLIENT_ID}"
        f"&redirect_uri={GOOGLE_REDIRECT_URI}"
        "&response_type=code"
        "&scope=https://www.googleapis.com/auth/business.manage"
        "&access_type=offline"
        "&prompt=consent"
    )
    return RedirectResponse(auth_url)

@router.get("/auth/callback")
async def auth_callback(code: str):
    token_url = "https://oauth2.googleapis.com/token"
    async with httpx.AsyncClient() as client:
        data = {
            "code": code,
            "client_id": GOOGLE_CLIENT_ID,
            "client_secret": GOOGLE_CLIENT_SECRET,
            "redirect_uri": GOOGLE_REDIRECT_URI,
            "grant_type": "authorization_code",
        }
        res = await client.post(token_url, data=data)
        tokens = res.json()

    headers = {"Authorization": f"Bearer {tokens['access_token']}"}
    async with httpx.AsyncClient() as client:
        res = await client.get("https://mybusiness.googleapis.com/v4/accounts", headers=headers)
        accounts = res.json().get("accounts", [])
        if not accounts:
            return JSONResponse({"error": "No accounts found"}, status_code=400)
        account_id = accounts[0]['name'].split("/")[-1]

    async with AsyncSessionLocal() as db:
        result = await db.execute(select(Credential).where(Credential.account_id == account_id))
        cred = result.scalars().first()
        if not cred:
            cred = Credential(account_id=account_id)
        cred.access_token = tokens['access_token']
        cred.refresh_token = tokens['refresh_token']
        expires_in = tokens['expires_in']
        cred.expires_at = datetime.datetime.utcnow() + datetime.timedelta(seconds=expires_in)
        db.add(cred)
        await db.commit()

    return JSONResponse({"message": "Authorization successful", "account_id": account_id})


# ✅ Token refresher logic
async def get_valid_token(account_id: str) -> str:
    async with AsyncSessionLocal() as db:
        result = await db.execute(select(Credential).where(Credential.account_id == account_id))
        cred = result.scalars().first()

        if not cred:
            raise Exception(f"No credentials found for account {account_id}")

        if cred.expires_at < datetime.datetime.utcnow() + datetime.timedelta(minutes=2):
            print(f"[INFO] Refreshing token for account: {account_id}")
            async with httpx.AsyncClient() as client:
                res = await client.post(
                    "https://oauth2.googleapis.com/token",
                    data={
                        "client_id": GOOGLE_CLIENT_ID,
                        "client_secret": GOOGLE_CLIENT_SECRET,
                        "grant_type": "refresh_token",
                        "refresh_token": cred.refresh_token,
                    },
                    headers={"Content-Type": "application/x-www-form-urlencoded"},
                )
                if res.status_code != 200:
                    raise Exception(f"Token refresh failed for account {account_id}: {res.text}")

                data = res.json()
                cred.access_token = data["access_token"]
                cred.expires_at = datetime.datetime.utcnow() + datetime.timedelta(seconds=data["expires_in"])
                db.add(cred)
                await db.commit()

                print(f"[SUCCESS] Token refreshed for account: {account_id}")

        return cred.access_token