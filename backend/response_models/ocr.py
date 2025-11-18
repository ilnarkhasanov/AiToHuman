from pydantic import BaseModel


class OCRResponseModel(BaseModel):
    embedded_text: str