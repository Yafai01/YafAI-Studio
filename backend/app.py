from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from model import generate_code

app = FastAPI()

# ✅ CORS (THIS is what you were missing)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # later restrict in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Prompt(BaseModel):
    prompt: str

@app.post("/generate")
def generate(prompt: Prompt):
    code = generate_code(prompt.prompt)
    return {"code": code}
