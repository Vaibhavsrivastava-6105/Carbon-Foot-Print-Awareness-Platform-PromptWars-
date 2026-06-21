from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.api import routes

app = FastAPI(title="EcoGuide AI API", description="Backend for the Carbon Footprint Awareness Platform")

# Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For production, restrict to frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(routes.router, prefix="/api")

@app.get("/")
def root():
    return {"message": "Welcome to EcoGuide AI API"}
