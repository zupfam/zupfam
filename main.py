from fastapi import FastAPI, Depends, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from database import engine, get_db
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from models import Base, Review, Credential
from scheduler import start_scheduler
from auth import router as auth_router

app = FastAPI()
app.include_router(auth_router)
templates = Jinja2Templates(directory="templates")

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    start_scheduler()

@app.get("/", response_class=HTMLResponse)
async def root(request: Request):
    return templates.TemplateResponse("login.html", {"request": request})

@app.get("/reviews/highlights")
async def get_high_rated_reviews(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Review).where(Review.rating >= 4))
    return [dict(
        id=rev.id,
        author=rev.author_name,
        rating=rev.rating,
        comment=rev.comment,
        created=rev.create_time
    ) for rev in result.scalars().all()]

@app.get("/health")
async def health_check(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Credential))
    creds = result.scalars().all()
    return [{
        "account_id": c.account_id,
        "expires_at": c.expires_at,
        "time_left_minutes": int((c.expires_at - datetime.datetime.utcnow()).total_seconds() // 60)
    } for c in creds]