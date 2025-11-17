from dataclasses import dataclass


@dataclass
class HumanizeResult:
    previous_ai_rate: int
    fixed_text: str
    new_ai_rate: int
