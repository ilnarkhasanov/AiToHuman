from fastapi import FastAPI
import uvicorn

from dtos.analyze import AnalyzeDTO
from dtos.humanize import HumanizeDTO
from response_models.analyze import AnalyzeResponseModel, TextChunkResponseModel
from response_models.humanize import HumanizeResponseModel
from services.analyze_service import AnalyzeService

app = FastAPI()

analyze_service = AnalyzeService()


@app.post(
    "/analyze",
    response_model=AnalyzeResponseModel,
)
def analyze(analyze_dto: AnalyzeDTO):
    analyze_result = analyze_service.analyze(analyze_dto.text)

    return AnalyzeResponseModel(
        chunks=[
            TextChunkResponseModel.from_domain(text_chunk)
            for text_chunk in analyze_result.chunks
        ],
        ai_rate=analyze_result.ai_rate,
    )


@app.post(
    "/humanize",
    response_model=HumanizeResponseModel,
)
def humanize(humanize_dto: HumanizeDTO):
    return HumanizeResponseModel(previous_rate=90, new_rate=30, humanized_text="text")


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0")
