import json
from typing import Never
from entities.humanize_result import HumanizeResult
from llm_agent.llm_agent import LLMAgent
from models.gigachat.gigachat import llm


class HumanizeService:
    def __init__(self) -> None:
        self.agent = LLMAgent(
            llm,
            tools=[],
        )
    
    def _get_system_prompt(self) -> str:
        return """
            You are an AI text corrector.

            Your task:
            1. Determine what percentage of the text you are given is AI-generated (<previous_ai_rate>)
            2. Download the text you were given that you corrected (<old_text>)
            3. You are NOT ALLOWED to change the language of the text.
            4. Make the text you are given more similar to a human-written one
            and return the corrected version (<fixed_text>). You must not make any significant changes to the text. The meaning must remain exactly the same. 5. Determine the percentage similarity between the corrected text and the AI-generated text (<new_ai_rate>)
            5. Return ONLY valid JSON with the following format:

            {
                "previous_ai_rate": <previous_ai_rate>,
                "fixed_text": <fixed_text>,
                "new_ai_rate": <new_ai_rate>,
            }

            Rules:
            1. You don't explain.
            2. You don't output ANYTHING but JSON.
            3. In the JSON, you output ONLY the fields I described above.
            4. The corrected version of the text MUST NOT include your reasoning; it's only the corrected version.            
        """

    def _prepare_prompt(self, text: str) -> str:
        return ("""
            Text:
            ----------------
        """
            f"""
            {text}
            ----------------
        """
        )

    def humanize(self, text: str) -> HumanizeResult:
        system_prompt = self._get_system_prompt()
        prompt = self._prepare_prompt(text)
        raw_result = self.agent.invoke(system_prompt, prompt)
        json_result = json.loads(raw_result)

        return HumanizeResult(
            previous_ai_rate=json_result["previous_ai_rate"],
            fixed_text=json_result["fixed_text"],
            new_ai_rate=json_result["new_ai_rate"],
        )
