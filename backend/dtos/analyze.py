from pydantic import BaseModel


class AnalyzeDTO(BaseModel):
    text: str
