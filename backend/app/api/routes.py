from fastapi import APIRouter
from app.models.schemas import FootprintRequest, FootprintResponse, SimulatorRequest
from app.engine import calculator, advisor
import copy

router = APIRouter()

@router.post("/calculate", response_model=FootprintResponse)
def calculate_carbon_footprint(request: FootprintRequest):
    # 1. Calculate breakdown
    breakdown = calculator.calculate_footprint(request)
    
    # 2. Total monthly & annual
    total_monthly = sum([
        breakdown.transportation_kg,
        breakdown.home_energy_kg,
        breakdown.food_kg,
        breakdown.waste_kg
    ])
    total_annual = total_monthly * 12
    
    # 3. AI Advisor logic
    score, score_category = advisor.calculate_score(total_monthly)
    biggest_source = advisor.get_biggest_source(breakdown)
    recommendations, action_plan, expected_reduction = advisor.generate_recommendations(request, breakdown)
    
    return FootprintResponse(
        monthly_emissions_kg=round(total_monthly, 2),
        annual_emissions_kg=round(total_annual, 2),
        breakdown=breakdown,
        sustainability_score=score,
        score_category=score_category,
        biggest_emission_source=biggest_source,
        expected_reduction_percentage=expected_reduction,
        recommendations=recommendations,
        action_plan=action_plan
    )

@router.post("/simulate", response_model=FootprintResponse)
def simulate_action(request: SimulatorRequest):
    # Simulate how the footprint changes if the user takes an action
    simulated_request = copy.deepcopy(request.current_footprint)
    
    if request.action_type == "reduce_car":
        # e.g. reduce commute distance by action_value percentage
        simulated_request.commute_distance_km *= (1 - request.action_value / 100.0)
    elif request.action_type == "switch_renewable":
        simulated_request.renewable_energy_percentage = min(100.0, simulated_request.renewable_energy_percentage + request.action_value)
    elif request.action_type == "vegan_diet":
        simulated_request.diet_type = "vegan"
    elif request.action_type == "reduce_waste":
        simulated_request.waste_bags_per_week *= (1 - request.action_value / 100.0)
        
    # Recalculate using the same logic
    return calculate_carbon_footprint(simulated_request)
