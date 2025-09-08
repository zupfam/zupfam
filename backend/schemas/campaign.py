from typing import Optional

from pydantic import BaseModel

from backend.constants.enums import CreativeType


class Campaign(BaseModel):
    name: str


class Creative(BaseModel):
    type: CreativeType
    url: str
    playback_time: Optional[int] = 10
    cta_link: str


class UploadCreativeRequest(BaseModel):
    pass
