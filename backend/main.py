from fastapi import FastAPI

from core.db import engine
from routers import member_router

app = FastAPI()
app.include_router(member_router.router)


@app.get("/health")
async def health_check():
    print("Alhamdulillah")


@app.get("/pool-status")
async def pool_status():
    """Utility to see your connection pool status"""
    pool = engine.pool
    print(f"Pool size: {pool.size()}")
    print(f"Checked out connections: {pool.checkedout()}")
    print(f"Overflow: {pool.overflow()}")
    print(f"Checked in: {pool.checkedin()}")
