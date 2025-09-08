from fastapi import APIRouter

router = APIRouter(prefix="ZupFam Members", tags=["/members"])


@router.get("/")
def root():
    pass
