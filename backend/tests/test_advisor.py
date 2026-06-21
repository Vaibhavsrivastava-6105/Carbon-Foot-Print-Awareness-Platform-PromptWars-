from app.engine.advisor import calculate_score, get_biggest_source, generate_recommendations
from app.models.schemas import FootprintRequest, CategoryBreakdown

def test_calculate_score():
    # Excellent
    score, cat = calculate_score(150)
    assert score >= 90
    assert cat == "Excellent"
    
    # Good
    score, cat = calculate_score(300)
    assert 75 <= score <= 89
    assert cat == "Good"
    
    # Average
    score, cat = calculate_score(450)
    assert 50 <= score <= 74
    assert cat == "Average"
    
    # High Impact
    score, cat = calculate_score(1000)
    assert score < 50
    assert cat == "High Impact"

def test_get_biggest_source():
    b = CategoryBreakdown(transportation_kg=10, home_energy_kg=100, food_kg=50, waste_kg=20)
    assert get_biggest_source(b) == "Home Energy"

def test_generate_recommendations():
    req = FootprintRequest(vehicle_type="petrol_car", commute_distance_km=20, monthly_electricity_kwh=500, renewable_energy_percentage=0, diet_type="high_meat", recycling_habits="poor")
    b = CategoryBreakdown(transportation_kg=200, home_energy_kg=200, food_kg=150, waste_kg=40)
    
    recs, plan, expected = generate_recommendations(req, b)
    assert len(recs) > 0
    assert len(plan.daily) > 0
    assert expected > 0
