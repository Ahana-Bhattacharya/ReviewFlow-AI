from groq import Groq

from app.config import settings


client = Groq(
    api_key=settings.GROQ_API_KEY
)


async def generate_review(prompt: str):

    response = client.chat.completions.create(

        model=settings.GROQ_MODEL,

        messages=[

            {
                "role": "system",
                "content": """
You are ReviewFlow AI.

You must follow the requested review type exactly.

Rules:
- Do not give a general code review.
- Do not add extra sections.
- Only return the format requested by the user.
"""
            },

            {
                "role": "user",
                "content": prompt
            }

        ],

        temperature=0.1

    )


    return response.choices[0].message.content