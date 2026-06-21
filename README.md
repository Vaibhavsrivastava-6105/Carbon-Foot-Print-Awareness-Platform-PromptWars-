# EcoGuide AI – Carbon Footprint Awareness Platform

## Project Overview
EcoGuide AI is a production-quality Carbon Footprint Awareness Platform designed to help individuals understand, calculate, track, and reduce their carbon emissions. By utilizing data-driven calculations and an AI Sustainability Advisor engine, the platform offers actionable insights tailored specifically to the user's lifestyle.

## Problem Statement
While many individuals want to live more sustainably, they often lack the tools to quantify their impact, identify high-emission habits, and discover the most effective actions they can take. EcoGuide AI solves this by translating complex data into easy-to-understand visualizations, personal sustainability scores, and step-by-step action plans.

## Features
- **Carbon Footprint Calculator**: Detailed inputs for Transportation, Home Energy, Food, and Waste.
- **Sustainability Score**: An intelligent 0–100 score analyzing the footprint against average baselines.
- **AI Sustainability Advisor**: Generates personalized, prioritized recommendations based on the user's specific emission profile.
- **Personalized Action Plan**: Breakdowns of daily actions, weekly goals, and monthly targets.
- **Progress Dashboard**: Interactive charts and detailed emission breakdowns using modern UI components.
- **Impact Simulator**: A "What-If" engine allowing users to test lifestyle changes (e.g., reducing car usage by 20%) and view projected annual reductions and community-scale impact.

## Architecture
The project follows a clean monorepo structure:
- **Frontend**: React (Vite) + Vanilla CSS. Focuses on premium, accessible, and highly responsive UI components. State is managed locally to minimize re-renders.
- **Backend**: Python (FastAPI). A performant, strictly typed backend utilizing Pydantic for robust input validation. Contains the business logic for emissions calculations and the AI recommendation engine.

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- Python (3.9+)

### Backend Setup
1. Navigate to the `backend` directory: `cd backend`
2. Create a virtual environment: `python -m venv venv`
3. Activate the environment:
   - Windows: `.\venv\Scripts\activate`
   - Unix/Mac: `source venv/bin/activate`
4. Install dependencies: `pip install -r requirements.txt`
5. Run the server: `uvicorn app.main:app --reload`
   - The API will be available at `http://localhost:8000`

### Frontend Setup
1. Navigate to the `frontend` directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`
   - The UI will be available at `http://localhost:5173` (or the port Vite provides)

## Running Tests
Testing is a core pillar of this project, ensuring reliability and accuracy.

**Backend Tests (pytest):**
```bash
cd backend
.\venv\Scripts\activate
python -m pytest tests/ --cov=app
```

**Frontend Tests (Vitest):**
```bash
cd frontend
npx vitest run
```

## Security Best Practices
- **Input Validation**: Strict typing and boundary checks (e.g., preventing negative values) implemented via Pydantic models on the backend.
- **CORS Configuration**: Backend restricted to explicit origins in production (currently `*` for local dev ease).
- **Graceful Error Handling**: API returns standardized HTTP errors without leaking stack traces.

## Accessibility
- **Semantic HTML**: Proper heading hierarchies and semantic tags used throughout the frontend.
- **Color Contrast**: Dark mode palette meticulously chosen to ensure high contrast ratios.
- **Aria Attributes**: Form inputs mapped with correct labels.

## Assumptions
- Global average emission factors were used as baselines (e.g., 0.192 kg CO2/km for petrol cars, 0.4 kg CO2/kWh for electricity). In a real-world scenario, these should be dynamically adjusted based on regional grid data.
- The AI Advisor operates deterministically based on deep heuristics to guarantee safe, accurate advice without requiring an active LLM subscription for this initial release.

## Future Improvements
- **Authentication**: Add user accounts (JWT/OAuth) to save historical footprints and track progress over months.
- **Real LLM Integration**: Swap the deterministic advisor engine with a Gemini/OpenAI integration for more conversational, dynamic advice.
- **Regional Factors**: Integrate external APIs to fetch local energy grid emission factors.
