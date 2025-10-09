from pydantic import BaseModel


class HumanizeResponseModel(BaseModel):
    previous_rate: int
    new_rate: int
    humanized_text: str
