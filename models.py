from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.ext.declarative import declarative_base
import datetime

Base = declarative_base()

class Review(Base):
    __tablename__ = "reviews"
    id = Column(Integer, primary_key=True, index=True)
    review_id = Column(String, unique=True, index=True)
    author_name = Column(String)
    rating = Column(Integer)
    comment = Column(Text)
    create_time = Column(DateTime)
    location_id = Column(String)
    account_id = Column(String)
    source = Column(String, default="google")

class Credential(Base):
    __tablename__ = "credentials"
    account_id = Column(String, primary_key=True)
    access_token = Column(Text)
    refresh_token = Column(Text)
    expires_at = Column(DateTime)