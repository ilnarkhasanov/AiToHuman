from fastapi import FastAPI

from backend.response_models.analyze import AnalyzeResponseModel
from backend.response_models.humanize import HumanizeResponseModel

app = FastAPI()


@app.post(
    "/analyze",
    response_model=AnalyzeResponseModel,
)
def analyze():
    raise NotImplementedError


@app.post(
    "/humanize",
    response_model=HumanizeResponseModel,
)
def humanize():
    raise NotImplementedError
