from typing import Annotated
from pydantic import BaseModel, StringConstraints
from restrictions.text import MAX_TEXT_LENGTH


class AnalyzeDTO(BaseModel):
    text: Annotated[str, StringConstraints(max_length=MAX_TEXT_LENGTH)]
