from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse

from app.models.request_models import ReviewRequest

from app.services.ai_service import generate_review
from app.services.prompt_builder import build_prompt


router = APIRouter(
    prefix="/review",
    tags=["Review"]
)



@router.post("/{review_type}")
async def review_code(
    review_type: str,
    request: ReviewRequest
):

    allowed_types = [
        "automate",
        "local",
        "ci",
        "human"
    ]


    if review_type not in allowed_types:

        raise HTTPException(
            status_code=400,
            detail="Invalid review type"
        )



    prompt = build_prompt(
        review_type,
        request.language,
        request.code
    )


    print("\n========== REVIEW TYPE ==========")
    print(review_type)


    print("\n========== LANGUAGE ==========")
    print(request.language)


    print("\n========== PROMPT ==========")
    print(prompt)



    review = await generate_review(
        prompt
    )



    async def review_stream():

        yield review



    return StreamingResponse(
        review_stream(),
        media_type="text/plain"
    )