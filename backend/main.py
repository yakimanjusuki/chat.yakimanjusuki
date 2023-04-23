import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from dotenv import load_dotenv
load_dotenv()

from simple_agent import ask_question, ask_character_img, ask_character_name, ask_translate_english

app = FastAPI()
if (os.environ.get('DEV_ENV')):
    origins = ["http://localhost:3000"]
else:
    origins = ["https://chat.yakimanjusuki.love"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatMessage(BaseModel):
    text: str = Field(max_length=1000)
    role: str

class ChatResponse(BaseModel):
    text: str

class CharacterMessage(BaseModel):
    text: str = Field(max_length=1000)

class CharacterResponse(BaseModel):
    img: str
    name: str

class CharacterImg(BaseModel):
    name: str

@app.get("/api/")
async def root():
    return {"message": "Hello Worlda"}

@app.get("/api/healthcheck")
def healthcheck():
    return {}

@app.post("/api/chat")
async def chat(message: ChatMessage) -> ChatResponse:
    answer = ask_question(message.text, message.role)
    return { 'text': answer.choices[0].message.content }

@app.post("/api/character")
async def character(message: CharacterMessage) -> CharacterResponse:
    t_name = ask_translate_english(message.text)
    Img = ask_character_img(t_name.choices[0].message.content)
    name = ask_character_name(message.text)
    return { 'img': Img.data[0].url, 'name': name.choices[0].message.content }
