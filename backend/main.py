from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from backend import database, schemas, crud

app = FastAPI()

# Dependency: get DB session
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


@app.get("/users")
def get_users(db: Session = Depends(get_db)):
    return db.query(database.User).all()

@app.get("/training/questions")
def get_questions(db: Session = Depends(get_db)):
    return db.query(database.TrainingQuestion).all()

@app.post("/sos")
def sos_alert(req: schemas.SOSRequest, db: Session = Depends(get_db)):
    return crud.create_alert(db, req.user_id, req.location)

@app.post("/training/answer")
def submit_training(req: schemas.TrainingAnswerRequest, db: Session = Depends(get_db)):
    return crud.create_training_answer(db, req.user_id, req.question_id, req.answer)
