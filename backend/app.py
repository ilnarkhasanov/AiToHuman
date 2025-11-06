from fastapi import FastAPI
import uvicorn

from dtos.analyze import AnalyzeDTO
from dtos.humanize import HumanizeDTO
from response_models.analyze import AnalyzeResponseModel, TextChunkResponseModel
from response_models.humanize import HumanizeResponseModel

app = FastAPI()


@app.post(
    "/analyze",
    response_model=AnalyzeResponseModel,
)
def analyze(analyze_dto: AnalyzeDTO):
    return AnalyzeResponseModel(chunks=[TextChunkResponseModel(text="text", ai_generated=True)], ai_rate=50)


@app.post(
    "/humanize",
    response_model=HumanizeResponseModel,
)
def humanize(humanize_dto: HumanizeDTO):
    return HumanizeResponseModel(previous_rate=90, new_rate=30, humanized_text="text")


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0")
