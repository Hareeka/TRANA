from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from backend import database, schemas, crud   # now import crud

app = FastAPI()

# Dependency
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def root():
    return {"message": "TRANA Backend is running"}

@app.post("/sos")
def sos_alert(req: schemas.SOSRequest, db: Session = Depends(get_db)):
    alert = crud.create_alert(db, req)
    return {"status": "Alert saved", "alert_id": alert.id, "location": alert.location}

@app.post("/training/answer")
def submit_training(req: schemas.TrainingAnswerRequest, db: Session = Depends(get_db)):
    training_answer = crud.create_training_answer(db, req)
    return {"status": "Answer saved", "id": training_answer.id}
