from pydantic import BaseModel


class ReviewRequest(BaseModel):

    code: str

    language: str