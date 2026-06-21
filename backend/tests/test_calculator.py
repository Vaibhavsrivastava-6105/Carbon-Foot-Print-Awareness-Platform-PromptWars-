from app.engine.calculator import calculate_transportation, calculate_home_energy, calculate_food, calculate_waste, calculate_footprint
from app.models.schemas import FootprintRequest

def test_calculate_transportation():
    req = FootprintRequest(
        commute_distance_km=10, 
        vehicle_type="petrol_car", 
        flights_per_year=1,
        carpool_frequency="often", # 0.5 multiplier
        public_transit_hours=5
    )
    # 10 * 30 * 0.192 * 0.5 = 28.8
    # Transit: 5 * 4 * 30 * 0.041 = 24.6
    # Flights: 1 * 250 / 12 = 20.833
    # Total: 28.8 + 24.6 + 20.833 = 74.233
    assert round(calculate_transportation(req), 1) == 74.2

def test_calculate_home_energy():
    req = FootprintRequest(
        monthly_electricity_kwh=100, 
        renewable_energy_percentage=50,
        heating_source="electricity",
        living_space_sqm=50
    )
    # Elec: 100 * 0.4 * 0.5 = 20.0
    # Heating: 50 * 0.5 * 0.5 (renewable) = 12.5
    # Total: 32.5
    assert calculate_home_energy(req) == 32.5

def test_calculate_food():
    req = FootprintRequest(
        diet_type="mixed", # 105.0
        local_food_sourcing="most", # * 0.9 = 94.5
        beef_meals_per_week=2, # 2 * 4 * 4 = 32.0
        food_waste_frequency="often" # + 30.0
    )
    # Total: 94.5 + 32.0 + 30.0 = 156.5
    assert calculate_food(req) == 156.5

def test_calculate_waste():
    req = FootprintRequest(
        recycling_habits="good", # 15.0
        waste_bags_per_week=2, # multiplier = 1.0 -> 15.0
        composting_habit="yes", # * 0.7 = 10.5
        packaging_awareness="very_conscious" # * 0.8 = 8.4
    )
    assert round(calculate_waste(req), 2) == 8.4

def test_calculate_footprint_total():
    req = FootprintRequest() # Use defaults to ensure it handles zero-states without crashing
    breakdown = calculate_footprint(req)
    assert breakdown.transportation_kg >= 0.0
    assert breakdown.home_energy_kg >= 0.0
    assert breakdown.food_kg >= 0.0
    assert breakdown.waste_kg >= 0.0
