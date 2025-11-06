from pydantic import BaseModel


class TextChunkResponseModel(BaseModel):
    text: str
    ai_generated: bool


class AnalyzeResponseModel(BaseModel):
    chunks: list[TextChunkResponseModel]
    ai_rate: int
