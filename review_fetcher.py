import httpx
from database import AsyncSessionLocal
from models import Credential
from crud import upsert_review
from sqlalchemy.future import select
from auth import get_valid_token

async def fetch_and_store_reviews():
    async with AsyncSessionLocal() as db:
        result = await db.execute(select(Credential))
        creds = result.scalars().all()

        for cred in creds:
            try:
                access_token = await get_valid_token(cred.account_id)
                headers = {"Authorization": f"Bearer {access_token}"}

                async with httpx.AsyncClient() as client:
                    locs = await client.get(f"https://mybusiness.googleapis.com/v4/accounts/{cred.account_id}/locations", headers=headers)
                    for loc in locs.json().get("locations", []):
                        loc_id = loc["name"].split("/")[-1]
                        reviews_res = await client.get(
                            f"https://mybusiness.googleapis.com/v4/accounts/{cred.account_id}/locations/{loc_id}/reviews",
                            headers=headers
                        )
                        for r in reviews_res.json().get("reviews", []):
                            stars = r.get("starRating", "ONE")
                            rating = {"ONE": 1, "TWO": 2, "THREE": 3, "FOUR": 4, "FIVE": 5}.get(stars, 0)
                            if rating >= 4:
                                await upsert_review(db, {
                                    "review_id": r["reviewId"],
                                    "author_name": r["reviewer"]["displayName"],
                                    "rating": rating,
                                    "comment": r.get("comment", ""),
                                    "create_time": r["createTime"],
                                    "location_id": loc_id,
                                    "account_id": cred.account_id,
                                })
            except Exception as e:
                print(f"[ERROR] Failed for account {cred.account_id}: {e}")