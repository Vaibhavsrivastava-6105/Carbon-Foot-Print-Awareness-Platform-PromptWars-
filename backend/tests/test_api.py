from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to EcoGuide AI API"}

def test_calculate_endpoint():
    payload = {
        "commute_distance_km": 10,
        "vehicle_type": "petrol_car",
        "flights_per_year": 1,
        "monthly_electricity_kwh": 200,
        "renewable_energy_percentage": 20,
        "diet_type": "mixed",
        "recycling_habits": "average",
        "waste_bags_per_week": 2
    }
    response = client.post("/api/calculate", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "sustainability_score" in data
    assert "breakdown" in data
    assert "action_plan" in data
    assert data["monthly_emissions_kg"] > 0

def test_simulate_endpoint():
    payload = {
        "current_footprint": {
            "commute_distance_km": 10,
            "vehicle_type": "petrol_car"
        },
        "action_type": "reduce_car",
        "action_value": 50 # reduce by 50%
    }
    response = client.post("/api/simulate", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["monthly_emissions_kg"] > 0
    # Transportation emissions should be half of what it would be for 10km
    # 10km * 30 * 0.192 = 57.6
    # Halved: 28.8
    assert round(data["breakdown"]["transportation_kg"], 1) == 28.8
