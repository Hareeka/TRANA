from sqlalchemy.orm import Session
from . import database, schemas

# Create user
def create_user(db: Session, user: schemas.UserCreate):
    db_user = database.User(name=user.name, email=user.email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_users(db: Session):
    return db.query(database.User).all()

# Save SOS Alert with AI coach advice
def create_alert(db: Session, user_id: int, location: str):
    alert = database.Alert(user_id=user_id, location=location)
    db.add(alert)
    db.commit()
    db.refresh(alert)

    advice = get_ai_advice(location)

    return {
        "status": "Alert saved",
        "alert_id": alert.id,
        "location": alert.location,
        "advice": advice
    }

# AI Coach logic
def get_ai_advice(situation: str) -> str:
    situation = situation.lower()
    if "fire" in situation:
        return "Move away from the fire, alert others, and call 101."
    elif "kidnap" in situation or "abduct" in situation:
        return "Stay calm. Share your live location. Look for safe exits."
    elif "accident" in situation:
        return "Call emergency services immediately and move to safety."
    else:
        return "Stay calm, use SOS to notify trusted contacts, and seek help nearby."

# Save Training Answer + Rewards
def create_training_answer(db: Session, user_id: int, question_id: int, answer: str):
    question = db.query(database.TrainingQuestion).filter(database.TrainingQuestion.id == question_id).first()
    if not question:
        return {"status": "Error", "message": "Question not found"}

    is_correct = (answer == question.correct_answer)
    earned_points = 0

    training_answer = database.TrainingAnswer(
        user_id=user_id,
        question_id=question_id,
        answer=answer,
        is_correct=is_correct
    )
    db.add(training_answer)

    if is_correct:
        user = db.query(database.User).filter(database.User.id == user_id).first()
        if user:
            user.rewards_points += 10
            earned_points = 10
            db.add(user)

    db.commit()
    db.refresh(training_answer)

    return {
        "status": "Answer saved",
        "id": training_answer.id,
        "is_correct": is_correct,
        "earned_points": earned_points
    }

# Training questions
def get_training_questions(db: Session):
    return db.query(database.TrainingQuestion).all()

def create_training_question(db: Session, question: schemas.TrainingQuestionCreate):
    db_question = database.TrainingQuestion(
        question_text=question.question_text,
        video_url=question.video_url,
        correct_answer=question.correct_answer,
        options=question.options
    )
    db.add(db_question)
    db.commit()
    db.refresh(db_question)
    return db_question

def create_alert(db: Session, user_id: int, latitude: float, longitude: float):
    alert = database.Alert(user_id=user_id, latitude=latitude, longitude=longitude)
    db.add(alert)
    db.commit()
    db.refresh(alert)

    advice = get_ai_advice(f"{latitude},{longitude}")  # or pass other appropriate string
    return {
        "status": "Alert saved",
        "alert_id": alert.id,
        "latitude": alert.latitude,
        "longitude": alert.longitude,
        "timestamp": alert.timestamp,
        "advice": advice,
    }

