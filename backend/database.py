<<<<<<< HEAD
import os
from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import declarative_base, sessionmaker, relationship

# Base declarative class
Base = declarative_base()

# Set database file path (parent folder of backend)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB_PATH = os.path.join(BASE_DIR, "trana.db")

engine = create_engine(f"sqlite:///{DB_PATH}", echo=True)

# Sessionmaker bound to engine
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

# Dependency generator (especially for FastAPI)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ORM model definitions

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    rewards_points = Column(Integer, default=0)

    alerts = relationship("Alert", back_populates="user")
    training_answers = relationship("TrainingAnswer", back_populates="user")

class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    location = Column(String, nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    risk_level = Column(String, default="Unknown")
    timestamp = Column(DateTime)
    user = relationship("User", back_populates="alerts")

class TrainingAnswer(Base):
    __tablename__ = "training_answers"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    question_id = Column(Integer, ForeignKey("training_questions.id"))
    answer = Column(String)
    is_correct = Column(Boolean, default=False)
    reaction_time = Column(Integer, nullable=True)

    user = relationship("User", back_populates="training_answers")
    question = relationship("TrainingQuestion", back_populates="answers")

class TrainingQuestion(Base):
    __tablename__ = "training_questions"

    id = Column(Integer, primary_key=True)
    question_text = Column(String, nullable=False)
    video_url = Column(String, nullable=True)
    correct_answer = Column(String, nullable=False)
    options = Column(String, nullable=True)

    answers = relationship("TrainingAnswer", back_populates="question")

# Create all tables in the database
Base.metadata.create_all(engine)
=======
import os
from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import declarative_base, sessionmaker, relationship

# Base declarative class
Base = declarative_base()

# Set database file path (parent folder of backend)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB_PATH = os.path.join(BASE_DIR, "trana.db")

engine = create_engine(f"sqlite:///{DB_PATH}", echo=True)

# Sessionmaker bound to engine
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

# Dependency generator (especially for FastAPI)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ORM model definitions

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    rewards_points = Column(Integer, default=0)

    alerts = relationship("Alert", back_populates="user")
    training_answers = relationship("TrainingAnswer", back_populates="user")

class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    location = Column(String, nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    risk_level = Column(String, default="Unknown")
    timestamp = Column(DateTime)
    user = relationship("User", back_populates="alerts")

class TrainingAnswer(Base):
    __tablename__ = "training_answers"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    question_id = Column(Integer, ForeignKey("training_questions.id"))
    answer = Column(String)
    is_correct = Column(Boolean, default=False)
    reaction_time = Column(Integer, nullable=True)

    user = relationship("User", back_populates="training_answers")
    question = relationship("TrainingQuestion", back_populates="answers")

class TrainingQuestion(Base):
    __tablename__ = "training_questions"

    id = Column(Integer, primary_key=True)
    question_text = Column(String, nullable=False)
    video_url = Column(String, nullable=True)
    correct_answer = Column(String, nullable=False)
    options = Column(String, nullable=True)

    answers = relationship("TrainingAnswer", back_populates="question")

# Create all tables in the database
Base.metadata.create_all(engine)
>>>>>>> f6cbed426fddf7ce89e07517047e0fc1935c902b
