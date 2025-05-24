from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings


MONGODB_URI = settings.mongodb_uri

if not MONGODB_URI:
    raise RuntimeError("MONGODB_URI is not set in environment variables")

DB_NAME = MONGODB_URI.rsplit("/", 1)[-1]

client = None
db = None


async def init_db():
    global client, db
    try:
        client = AsyncIOMotorClient(MONGODB_URI)
        db = client[DB_NAME]
        print(f"Connected to MongoDB: {DB_NAME}")  # Console log after connect
    except Exception as e:
        raise RuntimeError(f"Failed to connect to MongoDB: {e}")


async def close_db():
    global client
    if client:
        client.close()
        print("MongoDB connection closed")  #  Console log after disconnect


def get_db():
    return db
