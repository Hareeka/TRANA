<<<<<<< HEAD
from flask import Flask, jsonify, request
from flask_cors import CORS
import logging
import requests
from database import User, Alert, SessionLocal

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

IBM_API_KEY = "azE6dXNyXzRmZmIyZTExLWJlMzQtMzA3OS05ZjNiLWZlMjQwOTNmMzBlMTpYcmhuajBJRU5RcXVEUFBndEhJMlNtMVFlQWlEYVB4VStnY3RQaUhvMVdNPTpBRCto"
IBM_API_URL = "https://api.ap-south-1.dl.watson-orchestrate.ibm.com/instances/20250907-1827-4190-50ed-be5164ad3b81"

def classify_risk_with_ibm(location, coords):
    prompt_text = f"Classify the safety risk of the following area as Safe, Moderate, or Dangerous:\nLocation: {location}\nCoordinates: {coords}\nRisk Level:"
    headers = {
        "Authorization": f"Bearer {IBM_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {"input": prompt_text}
    try:
        response = requests.post(IBM_API_URL, headers=headers, json=payload, timeout=10)
        result = response.json()
        risk_level = result.get("results", [{}])[0].get("generated_text", "").strip()
        if "safe" in risk_level.lower():
            return "Safe"
        elif "moderate" in risk_level.lower():
            return "Moderate"
        else:
            return "Dangerous"
    except Exception as e:
        logging.error("IBM API error:", exc_info=True)
        return "Unknown"

@app.route("/map/risks")
def map_risks():
    session = SessionLocal()
    try:
        alerts = session.query(Alert).all()
        response_data = []
        for alert in alerts:
            risk_level = classify_risk_with_ibm(alert.location, [alert.latitude, alert.longitude])
            response_data.append({
                "id": alert.id,
                "location": alert.location,
                "coords": [alert.latitude, alert.longitude],
                "risk_level": risk_level,
                "timestamp": alert.timestamp.isoformat() if alert.timestamp else None
            })
        return jsonify(response_data)
    except Exception as e:
        logging.error("Error during fetching alerts:", exc_info=True)
        return jsonify({"error": "Internal server error"}), 500
    finally:
        session.close()

@app.route("/training/answer", methods=["POST", "OPTIONS"])
def training_answer():
    if request.method == "OPTIONS":
        return '', 204
    data = request.json
    return jsonify({"message": "Answer received", "data": data})

@app.route("/users/<int:user_id>/points")
def user_points_route(user_id):
    session = SessionLocal()
    try:
        user = session.query(User).filter(User.id == user_id).first()
        if user:
            return jsonify({"user_id": user.id, "points": user.rewards_points})
        else:
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        app.logger.error(f"Error fetching user points: {e}", exc_info=True)
        return jsonify({"error": "Internal server error"}), 500
    finally:
        session.close()

@app.route("/navigate", methods=["POST", "OPTIONS"])
def navigate():
    if request.method == "OPTIONS":
        return '', 204
    data = request.json
    return jsonify({"message": "Navigation request received", "data": data})

if __name__ == "__main__":
    app.run(port=8000, debug=True)
=======
from flask import Flask, jsonify, request
from flask_cors import CORS
import logging
import requests
from database import User, Alert, SessionLocal

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

IBM_API_KEY = "azE6dXNyXzRmZmIyZTExLWJlMzQtMzA3OS05ZjNiLWZlMjQwOTNmMzBlMTpYcmhuajBJRU5RcXVEUFBndEhJMlNtMVFlQWlEYVB4VStnY3RQaUhvMVdNPTpBRCto"
IBM_API_URL = "https://api.ap-south-1.dl.watson-orchestrate.ibm.com/instances/20250907-1827-4190-50ed-be5164ad3b81"

def classify_risk_with_ibm(location, coords):
    prompt_text = f"Classify the safety risk of the following area as Safe, Moderate, or Dangerous:\nLocation: {location}\nCoordinates: {coords}\nRisk Level:"
    headers = {
        "Authorization": f"Bearer {IBM_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {"input": prompt_text}
    try:
        response = requests.post(IBM_API_URL, headers=headers, json=payload, timeout=10)
        result = response.json()
        risk_level = result.get("results", [{}])[0].get("generated_text", "").strip()
        if "safe" in risk_level.lower():
            return "Safe"
        elif "moderate" in risk_level.lower():
            return "Moderate"
        else:
            return "Dangerous"
    except Exception as e:
        logging.error("IBM API error:", exc_info=True)
        return "Unknown"

@app.route("/map/risks")
def map_risks():
    session = SessionLocal()
    try:
        alerts = session.query(Alert).all()
        response_data = []
        for alert in alerts:
            risk_level = classify_risk_with_ibm(alert.location, [alert.latitude, alert.longitude])
            response_data.append({
                "id": alert.id,
                "location": alert.location,
                "coords": [alert.latitude, alert.longitude],
                "risk_level": risk_level,
                "timestamp": alert.timestamp.isoformat() if alert.timestamp else None
            })
        return jsonify(response_data)
    except Exception as e:
        logging.error("Error during fetching alerts:", exc_info=True)
        return jsonify({"error": "Internal server error"}), 500
    finally:
        session.close()

@app.route("/training/answer", methods=["POST", "OPTIONS"])
def training_answer():
    if request.method == "OPTIONS":
        return '', 204
    data = request.json
    return jsonify({"message": "Answer received", "data": data})

@app.route("/users/<int:user_id>/points")
def user_points_route(user_id):
    session = SessionLocal()
    try:
        user = session.query(User).filter(User.id == user_id).first()
        if user:
            return jsonify({"user_id": user.id, "points": user.rewards_points})
        else:
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        app.logger.error(f"Error fetching user points: {e}", exc_info=True)
        return jsonify({"error": "Internal server error"}), 500
    finally:
        session.close()

@app.route("/navigate", methods=["POST", "OPTIONS"])
def navigate():
    if request.method == "OPTIONS":
        return '', 204
    data = request.json
    return jsonify({"message": "Navigation request received", "data": data})

if __name__ == "__main__":
    app.run(port=8000, debug=True)
>>>>>>> f6cbed426fddf7ce89e07517047e0fc1935c902b
