from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from dtos.analyze import AnalyzeDTO
from dtos.humanize import HumanizeDTO
# from dtos.ocr import OCRDTO
from response_models.analyze import AnalyzeResponseModel, TextChunkResponseModel
from response_models.humanize import HumanizeResponseModel
from response_models.ocr import OCRResponseModel
from services.analyze_service import AnalyzeService
from services.humanize_service import HumanizeService
from services.ocr_service import OCRService

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

analyze_service = AnalyzeService()
humanize_service = HumanizeService()
ocr_service = OCRService()


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

ALLOWED_EXTENSIONS = {"png", "jpg", "webp", "pdf"}
@app.post(
    "/ocr",
    response_model=OCRResponseModel,
)
def ocr(file: UploadFile = File(...)):

    ext = file.filename.split(".")[-1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(400, f"Unsupported file type: .{ext}")

    ocr_result = ocr_service.ocr_space_file(file = file)
    return OCRResponseModel(
        text = ocr_result.text,
    )


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0")
