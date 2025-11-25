import pytest
from httpx import AsyncClient
from httpx import ASGITransport
from app import app

import pytest

humanize_test_cases = [
    (
        "ai_ice_cream", 
        "Of all life's simple pleasures, few are as universally cherished as ice cream. This frozen dessert, born from a churned symphony of cream, sugar, and flavorings, holds a magical power to delight. Its appeal is timeless and cross-cultural, capable of evoking childhood nostalgia on a hot summer day or providing a perfect, creamy finale to a special meal. Whether enjoyed from a humble cone, scooped high in a bowl, or sandwiched between two cookies, ice cream remains a beloved symbol of sweet, uncomplicated joy.",
        True
    ),
    (
        "ai_comfort_food",
        "There's something almost magical about the way a spoonful of ice cream can melt away a bad day. It's more than just a frozen treat; it's a scoop of comfort, a direct line back to the sticky-handed joy of childhood summers. It's the quiet, personal celebration after a long week, the shared laugh over a dripping cone, and the simple, creamy proof that sometimes the sweetest moments in life are the simplest ones.",
        True
    ),
    (
        "already_human",
        "Hey so I was just thinking about ice cream and like, it's really good you know? My favorite is chocolate chip cookie dough, what's yours? I always get it at that place downtown.",
        False
    ),
]

@pytest.mark.asyncio
@pytest.mark.parametrize("test_name,text,should_be_modified", humanize_test_cases)
async def test_humanize_various_texts(test_name, text, should_be_modified):
    """Ensure humanize endpoint returns proper fields and modifies AI text appropriately."""
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        payload = {"text": text}
        response = await ac.post("/humanize", json=payload)
        
        assert response.status_code == 200

        data = response.json()
        
        # Validate response structure
        assert "previous_rate" in data
        assert "new_rate" in data
        assert "humanized_text" in data

        assert isinstance(data["previous_rate"], (int, float))
        assert isinstance(data["new_rate"], (int, float))
        assert isinstance(data["humanized_text"], str)

        if should_be_modified:
            assert data["humanized_text"] != text, f"AI text '{test_name}' should be modified but wasn't"
            assert data["new_rate"] <= data["previous_rate"], f"AI text '{test_name}' should have lower AI rate after humanization"
            assert data["new_rate"] < 50, f"Humanized text '{test_name}' should have AI rate <50%, got {data['new_rate']}"
        else:
            
            assert data["new_rate"] <= data["previous_rate"] or abs(data["new_rate"] - data["previous_rate"]) < 10


@pytest.mark.asyncio
async def test_humanize_validation_error():
    """Invalid payload should trigger 422."""
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.post("/humanize", json={})
        assert response.status_code == 422
