# TRANA - AI-powered Personal Safety App

**Elevator Pitch:**  
TRANA empowers individuals to proactively protect themselves by providing AI-driven safety insights, personalized training, and emergency alerts—all in one seamless app.

---

## Project Description

TRANA (Train. React. Alert. Navigate. Assist.) is an AI-powered personal safety application designed to enhance user safety through real-time risk zone mapping, interactive self-defense training, instant SOS alerts, and personalized navigation advice. Integrated with IBM Granite AI modules and Twilio SMS, the app offers a comprehensive safety toolkit for everyday use.

---

## Table of Contents

- [Features](#features)  
- [Technology Stack](#technology-stack)  
- [Installation](#installation)  
- [Usage](#usage)  
- [API Endpoints](#api-endpoints)  
- [Contributing](#contributing)  
- [License](#license)  

---

## Features

- **Dynamic Risk Zone Mapping:** Uses AI and real-time incident data to visualize unsafe areas for users.  
- **AI-powered Training Modules:** Gamified self-defense drills to improve personal safety skills.  
- **Emergency SOS Alerts:** Instant notifications with location details sent via SMS to authorities and contacts.  
- **Personalized Navigation:** Advice for safer routes based on geographic risk evaluations.  
- **User Rewards:** Reward points system for training completion and engagement.  
- **Robust API:** FastAPI DR-based backend supporting seamless mobile and web app integration.

---

## Technology Stack

- **Backend:** FastAPI (Python), SQLAlchemy ORM  
- **AI Modules:** IBM Granite AI & ADK for risk assessment and training.  
- **Database:** SQLite (default), optional PostgreSQL configuration  
- **Messaging API:** Twilio SMS for emergency alert dispatching  
- **Frontend:** React.js (not included here)  
- **Deployment:** Can be containerized using Docker

---

## Installation

### Prerequisites

- Python 3.8+  
- Git  
- Virtual Environment Tool (venv, conda, etc.)  
- Twilio account credentials for SMS alerts

### Steps

1. Clone this repository:

git clone https://github.com/Hareeka/TRANA.git
cd TRANA/backend

text

2. Create and activate a virtual environment:

- Mac/Linux:

python3 -m venv venv
source venv/bin/activate

text

- Windows:

python -m venv venv
venv\Scripts\activate

text

3. Install dependencies:

pip install -r requirements.txt

text

4. Configure environment variables in `.env`:

TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=your_twilio_number
POLICE_PHONE=emergency_contact_number
FAMILY_PHONE=family_contact_number

text

5. Initialize database (optional):

python seed_db.py

text

6. Run the server:

uvicorn main:app --reload

text

Access API docs at [http://localhost:8000/docs](http://localhost:8001/docs).

---

## Usage

- Launch backend server: `uvicorn main:app --reload`  
- Use API docs for endpoints: [http://localhost:8000/docs](http://localhost:8001/docs)  
- Connect frontend or mobile app for full deployment

---

## API Endpoints (Highlights)

| Method | Endpoint | Description | Response Example |
|---------|-----------|--------------|------------------|
| `POST` | `/users` | Create a new user | JSON user data |
| `GET` | `/users` | List all users | Array of user objects |
| `POST` | `/training/questions` | Add training questions | Question object | 
| `GET` | `/training/questions` | List questions | Array of questions |
| `POST` | `/training/answer` | Submit training answer | Result with correctness & points |
| `POST` | `/sos` | Send SOS alert | Alert details |
| `GET` | `/map/risks` | Get recent risk alerts | Array of alerts |
| `POST` | `/navigate` | Get safety advice | Advice message |

---

## Contributing

Contributions are welcome!  
- Fork the repo  
- Create a feature branch (`git checkout -b your-feature`)  
- Commit your changes (`git commit -m "add feature"`)  
- Push your branch (`git push origin your-feature`)  
- Open a pull request.

Please adhere to coding standards and write clear, maintainable code.

---

## License

This project is licensed under the MIT License. See the [`LICENSE`](LICENSE) file for details.

---

*Built with ❤️ for the IndiaAI Impact Gen-AI Hackathon.*
