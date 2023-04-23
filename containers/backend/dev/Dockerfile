FROM python:3.11-slim

WORKDIR /backend

COPY ./backend/requirements.txt .
RUN pip install --no-cache-dir --upgrade -r /backend/requirements.txt

COPY ./backend/ .

CMD ["uvicorn", "main:app", "--proxy-headers", "--reload", "--host", "0.0.0.0", "--port", "8080"]
