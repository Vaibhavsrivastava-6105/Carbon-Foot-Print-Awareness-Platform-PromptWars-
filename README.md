# Carbon-Footprint-PromptWars

An AI-powered carbon footprint calculator and lifestyle advisor.

## 1. Chosen Vertical
**Smart, Dynamic Assistant (Carbon Footprint Awareness Platform)**
This project focuses on providing users with an interactive, intelligent assistant that calculates their carbon footprint based on daily lifestyle choices (transportation, energy, food, and waste) and provides customized, actionable advice to reduce their environmental impact.

## 2. Approach and Logic
The logic is driven by a full-stack architecture with a React frontend and a FastAPI backend.
*   **Data Collection**: The frontend collects user inputs across 4 main lifestyle categories.
*   **Calculation Engine**: The Python backend uses scientifically grounded emission factors to calculate the CO2 footprint (kg) per category.
*   **AI Advisor Engine**: The backend evaluates the calculated footprint, scores the user's sustainability (0-100), identifies the biggest emission source, and dynamically generates personalized Daily, Weekly, and Monthly action plans tailored to their specific data.
*   **Simulation**: A unique simulation engine allows users to preview the exact numerical impact of adopting a green habit (e.g., "What happens if I eat a vegan diet?").

## 3. How the Solution Works
1.  **Input**: The user fills out a beautifully designed, multi-step React form.
2.  **Processing**: The data is sent to the FastAPI `/calculate` endpoint, which computes emissions and generates the AI action plan.
3.  **Visualization**: The React Dashboard visualizes the emissions using interactive Recharts (Pie charts) and displays the personalized recommendations.
4.  **Simulation**: Users can click "Simulate Action" on the dashboard, which pings the `/simulate` endpoint to recalculate the footprint dynamically, showing a side-by-side comparison of current vs. simulated emissions.

## 4. Any Assumptions Made
*   **Emission Factors**: Fixed, standard emission multipliers are used (e.g., 0.192 kg CO2 per km for a petrol car). These are generalized global averages and do not account for hyper-local variations.
*   **Days in a Month**: Calculations assume a standard 30-day month for scaling daily and weekly habits up to monthly figures.
*   **Flight Distance**: Flights are assumed to be a standard short-to-medium haul average of 250 kg CO2 per flight.
*   **Energy Profile**: If a user specifies they use 50% renewable energy, we assume the remaining 50% comes from standard non-renewable grid averages.

## Tech Stack
*   **Frontend**: React, Vite, Recharts, Lucide Icons
*   **Backend**: FastAPI, Python, Pydantic
*   **Deployment**: Vercel (Serverless Functions)
