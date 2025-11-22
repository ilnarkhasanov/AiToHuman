import pytest
from httpx import AsyncClient
from httpx import ASGITransport
from app import app


@pytest.mark.asyncio
async def test_humanize_basic():
    """Ensure endpoint returns proper fields and a modified text string."""
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        payload = {
            "text": "This sentence sounds very robotic and formal."
        }

        response = await ac.post("/humanize", json=payload)
        
        assert response.status_code == 200

        data = response.json()
        print(data)

        assert "previous_rate" in data
        assert "new_rate" in data
        assert "humanized_text" in data

        assert isinstance(data["previous_rate"], (int, float))
        assert isinstance(data["new_rate"], (int, float))
        assert isinstance(data["humanized_text"], str)

        # AI should modify text
        assert data["humanized_text"] != payload["text"]


@pytest.mark.asyncio
async def test_humanize_informal_text():
    """Humanizing a naturally human text should keep it readable."""
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        payload = {
            "text": "bro I'm literally just writing this normally lol"
        }

        response = await ac.post("/humanize", json=payload)
        assert response.status_code == 200

        data = response.json()

        assert isinstance(data["humanized_text"], str)
        assert len(data["humanized_text"]) > 0


@pytest.mark.asyncio
async def test_humanize_validation_error():
    """Invalid payload should trigger 422."""
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.post("/humanize", json={})
        assert response.status_code == 422
