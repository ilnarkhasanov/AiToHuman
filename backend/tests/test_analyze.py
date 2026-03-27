import pytest
from httpx import AsyncClient
from fastapi import status
from httpx import ASGITransport
from app import app   # adjust import if needed

test_cases = [
    # AI-generated texts (should score high)
    ("ai_ice_cream_philosophy", "Of all life's simple pleasures, few are as universally cherished as ice cream. This frozen dessert, born from a churned symphony of cream, sugar, and flavorings, holds a magical power to delight. Its appeal is timeless and cross-cultural, capable of evoking childhood nostalgia on a hot summer day or providing a perfect, creamy finale to a special meal.", True),
    ("ai_comfort_food", "There's something almost magical about the way a spoonful of ice cream can melt away a bad day. It's more than just a frozen treat; it's a scoop of comfort, a direct line back to the sticky-handed joy of childhood summers.", True),
    ("ai_simple_joys", "It's the quiet, personal celebration after a long week, the shared laugh over a dripping cone, and the simple, creamy proof that sometimes the sweetest moments in life are the simplest ones. It's a little bite of happiness, pure and simple.", True),
    ("ai_technical", "The utilization of machine learning algorithms facilitates the optimization of predictive analytics through the implementation of neural network architectures that leverage backpropagation for enhanced accuracy in classification tasks.", True),
    ("ai_business", "Leveraging synergistic partnerships and disruptive innovation, we can catalyze paradigm shifts in the marketplace while optimizing core competencies to drive sustainable growth and stakeholder value.", True),
    ("ai_creative", "Beneath the cerulean canopy of the heavens, where zephyrs whisper through the emerald foliage, there exists a realm of boundless possibility, a tapestry woven from the threads of imagination and dreams.", True),
    
    # Human-like texts (should score low)
    ("human_conversational", "Hey so I was just thinking about ice cream and like, it's really good you know? My favorite is chocolate chip cookie dough, what's yours?", False),
    ("human_rough", "I ate some ice cream yesterday. It was pretty good. The chocolate kind. Yeah.", False),
    ("human_texting", "omg just had the best ice cream ever!!! 🍦 sooo good rn, you gotta try this place", False),
    ("human_rambling", "So I was thinking about getting ice cream but then I remembered I'm supposed to be saving money but also it's really hot outside and I deserve a treat right? Like it's not that expensive.", False),
    ("human_simple", "Ice cream is cold and sweet. I like it.", False),
    ("human_opinion", "I don't know why everyone makes such a big deal about fancy ice cream. Sometimes just plain vanilla is the best, especially with some sprinkles.", False),
]

@pytest.mark.asyncio
@pytest.mark.parametrize("test_name,text,is_ai", test_cases)
async def tests_analyze(test_name, text, is_ai):
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.post("/analyze", json={"text": text})
        
        assert response.status_code == 200
        data = response.json()
        
        if is_ai:
            assert data["ai_rate"] >= 50, f"AI text '{test_name}' should score >=50%, got {data['ai_rate']}"
        else:
            assert data["ai_rate"] <= 30, f"Human text '{test_name}' should score <=30%, got {data['ai_rate']}"

