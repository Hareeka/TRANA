from sqlalchemy import Column, Integer, String, DateTime, Float
from ..database import Base  # Your SQLAlchemy base

class Alert(Base):
    __tablename__ = "alerts"
    __table_args__ = {'extend_existing': True}

    id = Column(Integer, primary_key=True, index=True)
    location = Column(String, index=True)       # e.g., "MG Road"
    risk_level = Column(String, default="Unknown")  # "Safe", "Moderate", "Dangerous"
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    timestamp = Column(DateTime)
