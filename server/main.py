import uvicorn
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}

if __name__ == "__main__":
    # Programmatically run the server on port 8080
    uvicorn.run(app, host="127.0.0.1", port=8080)  # Change port here
