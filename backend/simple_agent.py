import openai
from langchain import PromptTemplate, LLMChain
from langchain.llms import OpenAI

def ask_question(question: str, role: str) -> str:
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": f'あなたは「{role}」です。'},
            {"role": "user", "content": f'{question}'}
        ]
    )
    return response

def ask_character_img(question: str) -> str:
    responseImg = openai.Image.create(
        prompt=question,
        n=1,
        size="256x256"
    )
    return responseImg

def ask_character_name(question: str) -> str:
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": f'「{question}の名前」を5文字以内で、1つ提案して。「。」は、不要。'}
        ]   
    )
    return response

def ask_translate_english(question: str) -> str:
    print(question)
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": f'「{question}のアニメキャラクター」を英語に翻訳して。'}
        ]   
    )
    return response