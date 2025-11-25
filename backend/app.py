from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from dtos.analyze import AnalyzeDTO
from dtos.humanize import HumanizeDTO
from llm_agent.llm_agent import LLMAgent
from response_models.analyze import AnalyzeResponseModel, TextChunkResponseModel
from response_models.humanize import HumanizeResponseModel
from services.analyze_service import AnalyzeService
from services.humanize_service import HumanizeService

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://localhost:5174",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from models.gigachat.gigachat import llm
agent = LLMAgent(
    llm,
    tools=[],
)

analyze_service = AnalyzeService(agent)
humanize_service = HumanizeService(agent)


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
    humanize_result = humanize_service.humanize(humanize_dto.text)
    return HumanizeResponseModel(
        previous_rate=humanize_result.previous_ai_rate,
        new_rate=humanize_result.new_ai_rate,
        humanized_text=humanize_result.fixed_text,
    )


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0")
