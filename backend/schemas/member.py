from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, EmailStr

from backend.constants.enums import UserStoreRole


class User(BaseModel):
    uid: int
    name: str
    mobile: str
    is_admin: bool = False
    email: Optional[EmailStr] = None
    profile_picture: Optional[str] = None
    created_at: datetime = datetime.now()
    modified_at: datetime = datetime.now()


class Store(BaseModel):
    uid: int
    name: str
    description: Optional[str] = None
    logo: Optional[str] = None
    is_advertiser: bool = False
    is_publisher: bool = False
    created_at: datetime = datetime.now()
    admin: int
    members: List[int] = []


class StoreExtras(BaseModel):
    uid: int
    store_id: int
    gst_number: Optional[str] = None
    address: Optional[str] = None
    pan_number: Optional[str] = None
    upi_id: Optional[str] = None
    bank_account_number: Optional[str] = None
    ifsc: Optional[str] = None
    billing_email: Optional[EmailStr] = None


class UserStoreMembership(BaseModel):
    uid: int
    user_id: int
    store_id: int
    role: UserStoreRole = UserStoreRole.MEMBER
    created_at: datetime = datetime.now()
