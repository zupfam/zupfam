from typing import Protocol


class SMSClient(Protocol):

    def send_sms(self, mobile: str, message: str) -> str:  # returns provider message id
        ...


class DummySMSClient:

    def send_sms(self, mobile: str, message: str) -> str:
        return f"dummy-sms:{mobile}:{len(message)}"
