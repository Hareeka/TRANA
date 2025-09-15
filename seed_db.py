# seed_db.py
from sqlalchemy.orm import Session
from backend.database import SessionLocal, User, TrainingQuestion # Make sure paths are correct

def seed_database():
    db = SessionLocal()
    try:
        # Check if user already exists
        if db.query(User).filter(User.id == 123).first() is None:
            print("Creating user with ID 123...")
            user_data = User(id=123, name="Test User", email="test@example.com", rewards_points=150)
            db.add(user_data)
        
        # Check if questions already exist
        if db.query(TrainingQuestion).count() == 0:
            print("Creating training questions...")
            questions_data = [
                TrainingQuestion(id=1, question_text="What is the first step when facing an attacker?", correct_answer="Stay calm and assess", options='["Run away", "Stay calm and assess", "Fight immediately", "Call for help"]'),
                TrainingQuestion(id=2, question_text="Where should you aim to strike in self-defense?", correct_answer="Eyes, nose, throat", options='["Eyes, nose, throat", "Legs", "Arms", "Back"]'),
                TrainingQuestion(id=3, question_text="What does situational awareness mean?", correct_answer="Knowing your surroundings", options='["Knowing your surroundings", "Focusing on your phone", "Ignoring people nearby", "Daydreaming"]')
            ]
            db.add_all(questions_data)
        
        db.commit()
        print("Database seeding complete!")
        
    except Exception as e:
        print(f"An error occurred: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()