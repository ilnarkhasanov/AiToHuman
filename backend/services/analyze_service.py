import json
from entities.analyze_result import AnalyzeResult
from entities.text_chunk import TextChunk

from llm_agent.llm_agent import LLMAgent


class AnalyzeService:
    def __init__(self, agent: LLMAgent) -> None:
        self.agent = agent

    def get_system_prompt(self) -> str:
        return """
            You are an advanced AI-text detector.
            
            TASK:
            1. Split the input text into meaningful segments (usually sentences or short paragraphs).
            2. For EACH segment classify it as:
            - "AI"     → likely written by an AI
            - "HUMAN"  → likely written by a person
            3. Send the AI rate of the text as an integer
            4. Memorize the result for the given text. When asked again, return the same result.
            5. Return ONLY a valid JSON. Format:

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
        """

    def prepare_prompt(self, text: str) -> str:
        return ("""
            
            Analyze the following text and classify each segment as AI-generated or Human-written:
            """
            f"""
            ----------------
            {text}
            ----------------
            """
        )

    def analyze(self, text: str) -> AnalyzeResult:
        system_prompt = self.get_system_prompt()
        prompt = self.prepare_prompt(text)
        raw_result = self.agent.invoke(system_prompt, prompt)
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
