FROM python:3.13-slim

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

WORKDIR /application

COPY pyproject.toml uv.lock /application/
RUN uv sync

COPY app.py /application/
COPY dtos /application/dtos
COPY entities /application/entities
COPY llm_agent /application/llm_agent
COPY models /application/models
COPY response_models /application/response_models
COPY services /application/services
COPY redis_client /application/redis_client

CMD ["uv", "run", "app.py"]
