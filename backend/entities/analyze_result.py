from dataclasses import dataclass

from entities.text_chunk import TextChunk


@dataclass
class AnalyzeResult:
    ai_rate: int
    chunks: list[TextChunk]
