
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from . import database, schemas, crud
from typing import List
from twilio.rest import Client
import os
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException
from fastapi import FastAPI
#from database import TrainingQuestion  # or your actual model file name
from .schemas import AnswerSchema     # or your actual schema file name
from .database import TrainingQuestion, User, get_db, Base, engine, SessionLocal, Alert
import logging
from fastapi import HTTPException
from pydantic import BaseModel

from .routers import sos
app = FastAPI()
app.include_router(sos.router)





# DEV ONLY: allow all origins so Framer can call your local API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],         # in production restrict this to your front-end domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def root():
    return {"message": "TRANA Backend is running"}

# -------- Users --------
@app.post("/users", response_model=schemas.UserResponse)
def create_new_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    return crud.create_user(db=db, user=user)

@app.get("/users", response_model=List[schemas.UserResponse])
def list_users(db: Session = Depends(get_db)):
    return crud.get_users(db)

@app.get("/users/{user_id}/points")
def get_user_points(user_id: int, db: Session = Depends(get_db)):
    user = db.query(database.User).filter(database.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {"points": user.rewards_points}

# -------- Training --------
@app.post("/training/questions", response_model=schemas.TrainingQuestion)
def add_question(question: schemas.TrainingQuestionCreate, db: Session = Depends(get_db)):
    return crud.create_training_question(db, question)

@app.get("/training/questions", response_model=List[schemas.TrainingQuestion])
def get_questions(db: Session = Depends(get_db)):
    return crud.get_training_questions(db)

@app.post("/training/answer")
def submit_training_answer(data: AnswerSchema, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.id == data.user_id).first()
    question = db.query(TrainingQuestion).filter(TrainingQuestion.id == data.question_id).first()
    if not user or not question:
        raise HTTPException(status_code=404, detail="User or question not found")

    is_correct = data.answer == question.correct_answer
    earned_points = 10 if is_correct else 0

    if is_correct:
        user.rewards_points += earned_points
        db.commit()

    return {
        "is_correct": is_correct,
        "earned_points": earned_points,
    }


# -------- SOS --------
@app.post("/sos", response_model=schemas.SOSResponse)
def sos_alert(req: schemas.SOSRequest, db: Session = Depends(get_db)):
    # Save alert (this also returns advice, alert_id, etc.)
    alert = crud.create_alert(db, req.user_id, req.latitude, req.longitude)
    try:
        # Extract latitude and longitude from location string
        latitude, longitude = req.location.split(",")  # Ensure frontend sends "lat,lng"
        send_sos_sms(req.user_id, latitude, longitude, alert['timestamp'])
    except Exception as e:
        # Optionally log error, but don't break advice delivery if SMS fails
        raise HTTPException(status_code=500, detail=f"Failed to send SOS SMS: {str(e)}")
    return alert

def send_sos_sms(user_id, latitude, longitude, timestamp):
    account_sid = os.getenv("TWILIO_ACCOUNT_SID")
    auth_token = os.getenv("TWILIO_AUTH_TOKEN")
    twilio_number = os.getenv("TWILIO_PHONE_NUMBER")
    police_number = os.getenv("POLICE_PHONE")
    family_number = os.getenv("FAMILY_PHONE")

    client = Client(account_sid, auth_token)
    maps_url = f"https://maps.google.com/?q={latitude},{longitude}"
    message_body = (
        f"🚨 SOS Alert 🚨\n"
        f"User: {user_id}\n"
        f"Location: {maps_url}\n"
        f"Time: {timestamp}\n"
        f"Please respond immediately."
    )
    for num in [police_number, family_number]:
        client.messages.create(
            body=message_body,
            from_=twilio_number,
            to=num,
        )


@app.get("/map/risks")
def get_risks(db: Session = Depends(get_db)):
    try:
        alerts = db.query(Alert).all()
        result = []
        for alert in alerts:
            result.append({
                "id": alert.id,
                # location is an optional field, add a check for it
                "location": alert.location if alert.location else "Unknown Location",
                # Now that you have added 'risk_level' to the Alert model in database.py, this will work.
                "risk_level": alert.risk_level, 
                # Use latitude and longitude from your Alert model.
                "coords": [alert.latitude, alert.longitude] if (alert.latitude is not None and alert.longitude is not None) else None,
                "timestamp": alert.timestamp.isoformat() if alert.timestamp else None
            })
        return result
    except Exception as e:
        logging.error("Error in /map/risks endpoint", exc_info=True)
        # Re-raise the exception after logging to show the full traceback in the console
        raise HTTPException(status_code=500, detail="Internal server error - see backend logs")
    
class NavigRequest(BaseModel):
    user_id: int
    latitude: float
    longitude: float
    location: str

class NavigResponse(BaseModel):
    advice: str

@app.post("/navigate", response_model=NavigResponse)
def navigate(data: NavigRequest):
    # Simple fixed message (replace with real AI call later)
    advice = f"Navigation advice for {data.location}: stay safe and avoid risk areas."

    return NavigResponse(advice=advice)

from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

from . import database, schemas, crud
from typing import List
from twilio.rest import Client
import os
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException
from fastapi import FastAPI
#from database import TrainingQuestion  # or your actual model file name
from .schemas import AnswerSchema     # or your actual schema file name
from .database import TrainingQuestion, User, get_db, Base, engine, SessionLocal, Alert
import logging
from fastapi import HTTPException
from pydantic import BaseModel

from backend import database, schemas, crud


from .routers import sos
app = FastAPI()
app.include_router(sos.router)





# DEV ONLY: allow all origins so Framer can call your local API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],         # in production restrict this to your front-end domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()



# ----------------------
# Endpoints
# ----------------------

@app.get("/")
def root():
    return {"message": "TRANA Backend is running"}


# -------- Users --------
@app.post("/users", response_model=schemas.UserResponse)
def create_new_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    return crud.create_user(db=db, user=user)

@app.get("/users", response_model=List[schemas.UserResponse])
def list_users(db: Session = Depends(get_db)):
    return crud.get_users(db)

@app.get("/users/{user_id}/points")
def get_user_points(user_id: int, db: Session = Depends(get_db)):
    user = db.query(database.User).filter(database.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {"points": user.rewards_points}

# -------- Training --------
@app.post("/training/questions", response_model=schemas.TrainingQuestion)
def add_question(question: schemas.TrainingQuestionCreate, db: Session = Depends(get_db)):
    return crud.create_training_question(db, question)

@app.get("/training/questions", response_model=List[schemas.TrainingQuestion])
def get_questions(db: Session = Depends(get_db)):
    return crud.get_training_questions(db)

@app.post("/users", response_model=schemas.UserCreate)
def create_new_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    return crud.create_user(db=db, user=user)


# This is the correct endpoint for getting questions
@app.get("/training/questions")
def get_questions(db: Session = Depends(get_db)):
    return db.query(database.TrainingQuestion).all()

@app.post("/sos")
def sos_alert(req: schemas.SOSRequest, db: Session = Depends(get_db)):
    return crud.create_alert(db, req.user_id, req.location)

# This is the correct endpoint for submitting answers
@app.post("/training/answer")

def submit_training_answer(data: AnswerSchema, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.id == data.user_id).first()
    question = db.query(TrainingQuestion).filter(TrainingQuestion.id == data.question_id).first()
    if not user or not question:
        raise HTTPException(status_code=404, detail="User or question not found")

    is_correct = data.answer == question.correct_answer
    earned_points = 10 if is_correct else 0

    if is_correct:
        user.rewards_points += earned_points
        db.commit()

    return {
        "is_correct": is_correct,
        "earned_points": earned_points,
    }


# -------- SOS --------
@app.post("/sos", response_model=schemas.SOSResponse)
def sos_alert(req: schemas.SOSRequest, db: Session = Depends(get_db)):
    # Save alert (this also returns advice, alert_id, etc.)
    alert = crud.create_alert(db, req.user_id, req.latitude, req.longitude)
    try:
        # Extract latitude and longitude from location string
        latitude, longitude = req.location.split(",")  # Ensure frontend sends "lat,lng"
        send_sos_sms(req.user_id, latitude, longitude, alert['timestamp'])
    except Exception as e:
        # Optionally log error, but don't break advice delivery if SMS fails
        raise HTTPException(status_code=500, detail=f"Failed to send SOS SMS: {str(e)}")
    return alert

def send_sos_sms(user_id, latitude, longitude, timestamp):
    account_sid = os.getenv("TWILIO_ACCOUNT_SID")
    auth_token = os.getenv("TWILIO_AUTH_TOKEN")
    twilio_number = os.getenv("TWILIO_PHONE_NUMBER")
    police_number = os.getenv("POLICE_PHONE")
    family_number = os.getenv("FAMILY_PHONE")

    client = Client(account_sid, auth_token)
    maps_url = f"https://maps.google.com/?q={latitude},{longitude}"
    message_body = (
        f"🚨 SOS Alert 🚨\n"
        f"User: {user_id}\n"
        f"Location: {maps_url}\n"
        f"Time: {timestamp}\n"
        f"Please respond immediately."
    )
    for num in [police_number, family_number]:
        client.messages.create(
            body=message_body,
            from_=twilio_number,
            to=num,
        )


@app.get("/map/risks")
def get_risks(db: Session = Depends(get_db)):
    try:
        alerts = db.query(Alert).all()
        result = []
        for alert in alerts:
            result.append({
                "id": alert.id,
                # location is an optional field, add a check for it
                "location": alert.location if alert.location else "Unknown Location",
                # Now that you have added 'risk_level' to the Alert model in database.py, this will work.
                "risk_level": alert.risk_level, 
                # Use latitude and longitude from your Alert model.
                "coords": [alert.latitude, alert.longitude] if (alert.latitude is not None and alert.longitude is not None) else None,
                "timestamp": alert.timestamp.isoformat() if alert.timestamp else None
            })
        return result
    except Exception as e:
        logging.error("Error in /map/risks endpoint", exc_info=True)
        # Re-raise the exception after logging to show the full traceback in the console
        raise HTTPException(status_code=500, detail="Internal server error - see backend logs")
    
class NavigRequest(BaseModel):
    user_id: int
    latitude: float
    longitude: float
    location: str

class NavigResponse(BaseModel):
    advice: str

@app.post("/navigate", response_model=NavigResponse)
def navigate(data: NavigRequest):
    # Simple fixed message (replace with real AI call later)
    advice = f"Navigation advice for {data.location}: stay safe and avoid risk areas."

    return NavigResponse(advice=advice)

def submit_training(req: schemas.TrainingAnswerRequest, db: Session = Depends(get_db)):
    return crud.create_training_answer(db, req.user_id, req.question_id, req.answer)

