from typing import Protocol


class WhatsAppClient(Protocol):

    def send_template(self, mobile: str, template: str,
                      variables: list[str]) -> str:  # returns provider message id
        ...


class DummyWhatsAppClient:
    """A no-op client used in tests and local dev."""

    def send_template(self, mobile: str, template: str, variables: list[str]) -> str:
        return f"dummy-wa:{mobile}:{template}:{'-'.join(variables)}"
