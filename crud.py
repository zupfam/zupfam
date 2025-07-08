from models import Review
from sqlalchemy.future import select

async def upsert_review(db, review_data):
    result = await db.execute(select(Review).where(Review.review_id == review_data['review_id']))
    existing = result.scalars().first()
    if existing:
        return
    review = Review(**review_data)
    db.add(review)
    await db.commit()