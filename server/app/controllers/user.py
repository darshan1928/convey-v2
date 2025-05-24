from fastapi import HTTPException
from app.core.database import get_db
from app.models.user import format_user
from app.schemas.user import UserCreate, UserLogin


async def signup_controller(user: UserCreate):
    db = get_db()
    print("testing")
    existing = await db.users.find_one({"email": user.email})
    if existing:
        raise HTTPException(status_code=400, detail="User already exists")

    result = await db.users.insert_one(user.dict())
    new_user = await db.users.find_one({"_id": result.inserted_id})
    return format_user(new_user)


async def login_controller(data: UserLogin):
    db = get_db()
    user = await db.users.find_one({"email": data.email})
    if not user or user["password"] != data.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"message": "Login successful", "user": format_user(user)}
