from fastapi import FastAPI
import uvicorn

from dtos.analyze import AnalyzeDTO
from dtos.humanize import HumanizeDTO
from response_models.analyze import AnalyzeResponseModel
from response_models.humanize import HumanizeResponseModel

app = FastAPI()


@app.post(
    "/analyze",
    response_model=AnalyzeResponseModel,
)
def analyze(analyze_dto: AnalyzeDTO):
    raise NotImplementedError


@app.post(
    "/humanize",
    response_model=HumanizeResponseModel,
)
def humanize(humanize_dto: HumanizeDTO):
    raise NotImplementedError


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0")
