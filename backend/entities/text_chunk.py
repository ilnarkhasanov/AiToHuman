from dataclasses import dataclass


@dataclass
class TextChunk:
    text: str
    ai_generated: bool
