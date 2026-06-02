FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

RUN addgroup --system app && adduser --system --group app

COPY pyproject.toml ./

RUN pip install --upgrade pip \
    && pip install --no-cache-dir -e . \
    && pip install --no-cache-dir gunicorn

COPY . .

USER app

EXPOSE 8000

CMD ["gunicorn", "app.main:app", "-k", "uvicorn.workers.UvicornWorker", "-w", "2", "-b", "0.0.0.0:8000"]