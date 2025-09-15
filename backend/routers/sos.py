from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import datetime
from backend import database, schemas
models = database  # alias database as models to access ORM classes

router = APIRouter()

@router.post("/sos")
def create_sos_alert(sos: schemas.SOSRequest, db: Session = Depends(database.get_db)):
    alert = models.Alert(
        user_id=sos.user_id,
        latitude=sos.latitude,
        longitude=sos.longitude,
        location=sos.location,
        timestamp=datetime.datetime.utcnow()
    )
    db.add(alert)
    db.commit()
    db.refresh(alert)
    return alert
