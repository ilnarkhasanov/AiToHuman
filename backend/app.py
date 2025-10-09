from fastapi import FastAPI

from backend.response_models.analyze.analyze import AnalyzeResponseModel

app = FastAPI()


@app.post(
    "/analyze",
    response_model=AnalyzeResponseModel,
)
def analyze():
    raise NotImplementedError
