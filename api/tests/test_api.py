from fastapi.testclient import TestClient
from api.index import app

client = TestClient(app)

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to EcoGuide AI API"}

def test_calculate_endpoint():
    payload = {
        "commute_distance_km": 10,
        "vehicle_type": "petrol_car"
    }
    response = client.post("/api/calculate", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "sustainability_score" in data
    assert "breakdown" in data

def test_simulate_endpoint():
    payload = {
        "current_footprint": {
            "commute_distance_km": 10,
            "vehicle_type": "petrol_car"
        },
        "action_type": "reduce_car",
        "action_value": 50
    }
    response = client.post("/api/simulate", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["monthly_emissions_kg"] > 0
