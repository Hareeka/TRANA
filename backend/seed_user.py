<<<<<<< HEAD
from database import SessionLocal, User
session = SessionLocal()
# Check if user exists
existing_user = session.query(User).filter(User.id == 123).first()

if not existing_user:
    user = User(id=123, name="Test User", email="test123@example.com", rewards_points=50)
    session.add(user)
    session.commit()
    print("User seeded successfully.")
else:
    print("User with id=123 already exists.")

=======
from database import SessionLocal, User
session = SessionLocal()
# Check if user exists
existing_user = session.query(User).filter(User.id == 123).first()

if not existing_user:
    user = User(id=123, name="Test User", email="test123@example.com", rewards_points=50)
    session.add(user)
    session.commit()
    print("User seeded successfully.")
else:
    print("User with id=123 already exists.")

>>>>>>> f6cbed426fddf7ce89e07517047e0fc1935c902b
session.close()