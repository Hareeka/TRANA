from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from backend import database

app = FastAPI()

# Dependency: get DB session
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# -------------------------------
# Pydantic Request Models
# -------------------------------

class SOSRequest(BaseModel):
    user_id: int
    location: str

class TrainingRequest(BaseModel):
    user_id: int
    question_id: int
    answer: str

# -------------------------------
# Endpoints
# -------------------------------

@app.get("/")
def root():
    return {"message": "TRANA Backend is running"}

@app.post("/sos")
def sos_alert(req: SOSRequest, db: Session = Depends(get_db)):
    alert = database.Alert(user_id=req.user_id, location=req.location)
    db.add(alert)
    db.commit()
    db.refresh(alert)
    return {
        "status": "Alert saved",
        "alert_id": alert.id,
        "location": alert.location
    }

@app.post("/train")
def submit_training(req: TrainingRequest, db: Session = Depends(get_db)):
    training_answer = database.TrainingAnswer(
        user_id=req.user_id,
        question_id=req.question_id,
        answer=req.answer,
        is_correct=False  # for now, later we’ll check against TrainingQuestions table
    )
    db.add(training_answer)
    db.commit()
    db.refresh(training_answer)
    return {
        "status": "Answer saved",
        "id": training_answer.id
    }
