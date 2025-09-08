import hashlib

from cryptography.fernet import Fernet

from backend.constants.otp import OTP_STATIC_PEPPER
from backend.core.config import settings

fernet = Fernet(settings.MOBILE_ENCRYPTION_KEY.encode())


def encrypt_mobile(mobile: str) -> str:
    return fernet.encrypt(mobile.encode()).decode()


def decrypt_mobile(token: str) -> str:
    return fernet.decrypt(token.encode()).decode()


def hash_mobile(mobile: str) -> str:
    return hashlib.sha256((mobile + settings.OTP_STATIC_PEPPER).encode()).hexdigest()


def hash_otp(otp: str, mobile: str) -> str:
    """Deterministic hash for storing OTP, includes mobile and static pepper.
    Avoid storing raw OTP.
    """
    m = hashlib.sha256()
    m.update((otp + ":" + mobile + ":" + OTP_STATIC_PEPPER).encode())
    return m.hexdigest()
