from api.engine.calculator import calculate_transportation, calculate_home_energy, calculate_food, calculate_waste, calculate_footprint
from api.models.schemas import FootprintRequest

def test_calculate_transportation():
    req = FootprintRequest(
        commute_distance_km=10, 
        vehicle_type="petrol_car", 
        flights_per_year=1,
        carpool_frequency="often",
        public_transit_hours=5
    )
    assert round(calculate_transportation(req), 1) == 74.2

def test_calculate_home_energy():
    req = FootprintRequest(
        monthly_electricity_kwh=100, 
        renewable_energy_percentage=50,
        heating_source="electricity",
        living_space_sqm=50
    )
    assert calculate_home_energy(req) == 32.5

def test_calculate_food():
    req = FootprintRequest(
        diet_type="mixed",
        local_food_sourcing="most",
        beef_meals_per_week=2,
        food_waste_frequency="often"
    )
    assert calculate_food(req) == 156.5

def test_calculate_waste():
    req = FootprintRequest(
        recycling_habits="good",
        waste_bags_per_week=2,
        composting_habit="yes",
        packaging_awareness="very_conscious"
    )
    assert round(calculate_waste(req), 2) == 8.4

def test_calculate_footprint_total():
    req = FootprintRequest()
    breakdown = calculate_footprint(req)
    assert breakdown.transportation_kg >= 0.0
    assert breakdown.home_energy_kg >= 0.0
    assert breakdown.food_kg >= 0.0
    assert breakdown.waste_kg >= 0.0
