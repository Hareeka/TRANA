from pydantic import BaseModel
from typing import Optional

# ----------------------
# Request Schemas
# ----------------------

class SOSRequest(BaseModel):
    user_id: int
    latitude: float
    longitude: float
    location: Optional[str] = None

class TrainingAnswerRequest(BaseModel):
    user_id: int
    question_id: int
    answer: str

class UserCreate(BaseModel):
    name: str
    email: str

class TrainingQuestionCreate(BaseModel):
    question_text: str
    video_url: Optional[str] = None
    correct_answer: str
    options: Optional[str] = None

# ----------------------
# Response Schemas
# ----------------------

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    rewards_points: int

    class Config:
        orm_mode = True

class SOSResponse(BaseModel):
    status: str
    alert_id: int
    location: str
    advice: str   # Added AI coach advice here

class TrainingAnswerResponse(BaseModel):
    status: str
    id: int
    is_correct: bool
    earned_points: int  # ✅ new

class TrainingQuestion(BaseModel):
    id: int
    question_text: str
    video_url: Optional[str] = None
    correct_answer: str
    options: Optional[str] = None

    class Config:
        orm_mode = True
class AnswerSchema(BaseModel):
    user_id: int
    question_id: int
    answer: str