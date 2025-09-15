<<<<<<< HEAD
from database import SessionLocal, engine, Base
from database import TrainingQuestion

Base.metadata.create_all(bind=engine)

questions = [
    {
        "id": 1,
        "question_text": "What is the first step when facing an attacker?",
        "correct_answer": "Stay calm and assess",
        "options": '["Run away", "Stay calm and assess", "Fight immediately", "Call for help"]',
    },
    {
        "id": 2,
        "question_text": "Where should you aim to strike in self-defense?",
        "correct_answer": "Eyes, nose, throat",
        "options": '["Eyes, nose, throat", "Legs", "Arms", "Back"]',
    },
    {
        "id": 3,
        "question_text": "What does situational awareness mean?",
        "correct_answer": "Knowing your surroundings",
        "options": '["Knowing your surroundings", "Focusing on your phone", "Ignoring people nearby", "Daydreaming"]',
    },
]

def seed():
    db = SessionLocal()
    for q in questions:
        existing = db.query(TrainingQuestion).filter(TrainingQuestion.id == q["id"]).first()
        if not existing:
            question = TrainingQuestion(
                id=q["id"],
                question_text=q["question_text"],
                correct_answer=q["correct_answer"],
                options=q["options"],
            )
            db.add(question)
    db.commit()
    db.close()
    print("Seeding complete.")

if __name__ == "__main__":
    seed()
=======
from database import SessionLocal, engine, Base
from database import TrainingQuestion

Base.metadata.create_all(bind=engine)

questions = [
    {
        "id": 1,
        "question_text": "What is the first step when facing an attacker?",
        "correct_answer": "Stay calm and assess",
        "options": '["Run away", "Stay calm and assess", "Fight immediately", "Call for help"]',
    },
    {
        "id": 2,
        "question_text": "Where should you aim to strike in self-defense?",
        "correct_answer": "Eyes, nose, throat",
        "options": '["Eyes, nose, throat", "Legs", "Arms", "Back"]',
    },
    {
        "id": 3,
        "question_text": "What does situational awareness mean?",
        "correct_answer": "Knowing your surroundings",
        "options": '["Knowing your surroundings", "Focusing on your phone", "Ignoring people nearby", "Daydreaming"]',
    },
]

def seed():
    db = SessionLocal()
    for q in questions:
        existing = db.query(TrainingQuestion).filter(TrainingQuestion.id == q["id"]).first()
        if not existing:
            question = TrainingQuestion(
                id=q["id"],
                question_text=q["question_text"],
                correct_answer=q["correct_answer"],
                options=q["options"],
            )
            db.add(question)
    db.commit()
    db.close()
    print("Seeding complete.")

if __name__ == "__main__":
    seed()
>>>>>>> f6cbed426fddf7ce89e07517047e0fc1935c902b
