from api.models.schemas import FootprintRequest, CategoryBreakdown

# Emission Factors
EMISSION_FACTORS = {
    "transport": {
        "petrol_car": 0.192,  # kg CO2 per km
        "diesel_car": 0.171,
        "electric_car": 0.053,
        "public_transport": 0.041,
        "none": 0.0
    },
    "flights": 250.0, # kg CO2 per short/medium haul flight
    "electricity": 0.4, # kg CO2 per kWh
    "diet": {
        "vegan": 45.0, # kg CO2 per month
        "vegetarian": 60.0,
        "mixed": 105.0,
        "high_meat": 150.0
    },
    "waste_recycling": {
        "poor": 40.0, # base kg CO2 per month
        "average": 25.0,
        "good": 15.0,
        "excellent": 5.0
    }
}

def calculate_transportation(request: FootprintRequest) -> float:
    days_in_month = 30
    monthly_km = request.commute_distance_km * days_in_month
    vehicle_factor = EMISSION_FACTORS["transport"].get(request.vehicle_type, 0.192)
    
    carpool_modifiers = {"never": 1.0, "sometimes": 0.8, "often": 0.5, "always": 0.3}
    carpool_factor = carpool_modifiers.get(request.carpool_frequency, 1.0)
    if request.vehicle_type in ["public_transport", "none"]:
        carpool_factor = 1.0
        
    commute_emissions = monthly_km * vehicle_factor * carpool_factor
    transit_emissions = request.public_transit_hours * 4 * 30 * EMISSION_FACTORS["transport"]["public_transport"]
    flight_emissions_annual = request.flights_per_year * EMISSION_FACTORS["flights"]
    
    return commute_emissions + transit_emissions + (flight_emissions_annual / 12)

def calculate_home_energy(request: FootprintRequest) -> float:
    non_renewable_percentage = (100 - request.renewable_energy_percentage) / 100
    electricity_emissions = request.monthly_electricity_kwh * EMISSION_FACTORS["electricity"] * non_renewable_percentage
    
    heating_factors = {"natural_gas": 1.2, "oil": 1.5, "electricity": 0.5, "none": 0.0}
    heating_emissions = request.living_space_sqm * heating_factors.get(request.heating_source, 1.2)
    if request.heating_source == "electricity":
        heating_emissions *= non_renewable_percentage
        
    return electricity_emissions + heating_emissions

def calculate_food(request: FootprintRequest) -> float:
    base_emissions = EMISSION_FACTORS["diet"].get(request.diet_type, 105.0)
    
    local_modifiers = {"rarely": 1.1, "some": 1.0, "most": 0.9, "almost_all": 0.8}
    base_emissions *= local_modifiers.get(request.local_food_sourcing, 1.0)
    
    beef_emissions = request.beef_meals_per_week * 4 * 4
    
    waste_penalties = {"rarely": 0.0, "sometimes": 15.0, "often": 30.0}
    waste_emissions = waste_penalties.get(request.food_waste_frequency, 15.0)
    
    return base_emissions + beef_emissions + waste_emissions

def calculate_waste(request: FootprintRequest) -> float:
    base_waste = EMISSION_FACTORS["waste_recycling"].get(request.recycling_habits, 25.0)
    bag_multiplier = request.waste_bags_per_week / 2.0
    emissions = base_waste * bag_multiplier
    
    if request.composting_habit == "yes":
        emissions *= 0.7
        
    packaging_modifiers = {"dont_care": 1.2, "somewhat": 1.0, "very_conscious": 0.8}
    emissions *= packaging_modifiers.get(request.packaging_awareness, 1.0)
    
    return emissions

def calculate_footprint(request: FootprintRequest) -> CategoryBreakdown:
    transportation_kg = calculate_transportation(request)
    home_energy_kg = calculate_home_energy(request)
    food_kg = calculate_food(request)
    waste_kg = calculate_waste(request)
    
    return CategoryBreakdown(
        transportation_kg=round(transportation_kg, 2),
        home_energy_kg=round(home_energy_kg, 2),
        food_kg=round(food_kg, 2),
        waste_kg=round(waste_kg, 2)
    )
