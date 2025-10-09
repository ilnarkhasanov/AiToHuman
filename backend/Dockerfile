FROM python:3.13-slim

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

WORKDIR /application

COPY pyproject.toml uv.lock /application/
RUN uv sync

COPY app.py /application/
COPY dtos /application/dtos
COPY response_models /application/response_models
COPY restrictions /application/restrictions

CMD ["uv", "run", "app.py"]
