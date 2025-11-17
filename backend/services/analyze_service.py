import json
from entities.analyze_result import AnalyzeResult
from entities.text_chunk import TextChunk
from models.gigachat.gigachat import llm

from llm_agent.llm_agent import LLMAgent


class AnalyzeService:
    def __init__(self) -> None:
        self.agent = LLMAgent(
            llm,
            tools=[],
        )

    def prepare_prompt(self, text: str) -> str:
        return ("""
            You are an advanced AI-text detector.

            TASK:
            1. Split the input text into meaningful segments (usually sentences or short paragraphs).
            2. For EACH segment classify it as:
            - "AI"     → likely written by an AI
            - "HUMAN"  → likely written by a person
            3. Send the AI rate of the text as an integer
            4. Return ONLY a valid JSON. Format:

            {
                "ai_rate": <ai_rate>,
                "segments": [
                    {"text": "<segment>", "label": "AI"},
                    {"text": "<segment>", "label": "HUMAN"}
                ]
            }

            RULES:
            - Do NOT merge segments.
            - Do NOT explain.
            - No additional fields.
            - JSON only.

            TEXT:
            """
            f"""
            ----------------
            {text}
            ----------------
            """
        )

    def analyze(self, text: str) -> AnalyzeResult:
        prompt = self.prepare_prompt(text)
        raw_result = self.agent.invoke(prompt)
        json_result = json.loads(raw_result)

        result = AnalyzeResult(
            ai_rate=json_result["ai_rate"],
            chunks=[],
        )

        for json_chunk in json_result["segments"]:
            result.chunks.append(
                TextChunk(
                    text=json_chunk["text"],
                    ai_generated=(
                        True if json_chunk["label"] == "AI" else False
                    )
                )
            )

        return result
