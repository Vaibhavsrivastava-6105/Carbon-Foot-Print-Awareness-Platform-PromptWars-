from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os
from api.api import routes

app = FastAPI(title="Carbon-Footprint-PromptWars API", description="Backend for the Carbon Footprint Awareness Platform")

# Allow frontend to connect during dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(routes.router, prefix="/api")

# Serve React Frontend Static Files (Single Link Local Setup)
if os.path.exists("dist"):
    app.mount("/assets", StaticFiles(directory="dist/assets"), name="assets")
    
    @app.get("/{full_path:path}")
    async def serve_react(full_path: str):
        # Serve index.html for all other routes to support React Router
        path_to_file = os.path.join("dist", full_path)
        if os.path.isfile(path_to_file):
            return FileResponse(path_to_file)
        return FileResponse("dist/index.html")
