from pydantic import BaseModel

from entities.text_chunk import TextChunk


class TextChunkResponseModel(BaseModel):
    text: str
    ai_generated: bool

    @classmethod
    def from_domain(cls, text_chunk: TextChunk) -> "TextChunkResponseModel":
        return TextChunkResponseModel(
            text=text_chunk.text,
            ai_generated=text_chunk.ai_generated,
        )


class AnalyzeResponseModel(BaseModel):
    chunks: list[TextChunkResponseModel]
    ai_rate: int
