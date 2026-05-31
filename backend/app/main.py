from fastapi import FastAPI

app = FastAPI(
    title="SentinelIQ API",
    version="0.1.0",
)


@app.get("/health")
def health_check():
    return {
        "status": "ok",
    }


@app.get("/api/meta")
def meta():
    return {
        "name": "SentinelIQ",
        "version": "0.1.0",
        "environment": "development",
    }