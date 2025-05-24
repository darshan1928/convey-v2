from fastapi import APIRouter
from app.schemas.user import UserCreate, UserLogin, UserOut
from app.controllers.user import signup_controller, login_controller

router = APIRouter(prefix="/users", tags=["Users"])


@router.post("/signup", response_model=UserOut)
async def signup(user: UserCreate):
    return await signup_controller(user)


@router.post("/login")
async def login(user: UserLogin):
    return await login_controller(user)
