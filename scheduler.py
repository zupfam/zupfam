from apscheduler.schedulers.asyncio import AsyncIOScheduler
from review_fetcher import fetch_and_store_reviews

def start_scheduler():
    scheduler = AsyncIOScheduler()
    scheduler.add_job(fetch_and_store_reviews, "interval", minutes=2)
    scheduler.start()