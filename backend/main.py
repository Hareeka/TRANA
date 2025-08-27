from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="TRANA Backend API", description="API for TRANA Safety App")

class SOSRequest(BaseModel):
	user_id: str
	location: str
class TrainingAnswer(BaseModel):
	user_id: str
	location: str
@app.get("/")
def root():
	return {"message": "TRANA Backend is running"}

@app.post("/sos")
def sos_alert(req: SOSRequest):
	# TODO: Integrate IBM ADK + Twilio/WhatsApp API for real alerts 
	return { "status": "Alert sent", "user_id": req.user_id,
		"location": req.location
	}
@app.post("/training/answer")
def training_answer(ans: TrainingAnswer):
	#TODO: Add logic to check correctness + update reward points
	return {
		"status": "Answer received",
		"question_id": ans.question_id,
		"answer": ans.answer
	}
