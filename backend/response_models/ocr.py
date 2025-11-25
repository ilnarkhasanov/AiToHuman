from pydantic import BaseModel


class OCRResponseModel(BaseModel):
    text: str
