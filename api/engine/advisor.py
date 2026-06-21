from api.models.schemas import FootprintRequest, CategoryBreakdown, ActionPlan, ActionItem
from typing import List, Tuple

def calculate_score(total_monthly_kg: float) -> Tuple[int, str]:
    """
    Calculate a sustainability score (0-100) based on monthly emissions.
    
    Args:
        total_monthly_kg (float): Total CO2 emissions in kg.
        
    Returns:
        Tuple[int, str]: A tuple containing the score (0-100) and the category name (e.g., "Excellent").
    """
    if total_monthly_kg <= 200:
        score = max(90, 100 - int((total_monthly_kg / 200) * 10))
        return score, "Excellent"
    elif total_monthly_kg <= 350:
        score = max(75, 89 - int(((total_monthly_kg - 200) / 150) * 14))
        return score, "Good"
    elif total_monthly_kg <= 550:
        score = max(50, 74 - int(((total_monthly_kg - 350) / 200) * 24))
        return score, "Average"
    else:
        score = max(0, 49 - int(((total_monthly_kg - 550) / 450) * 49))
        return score, "High Impact"

def get_biggest_source(breakdown: CategoryBreakdown) -> str:
    """
    Identify the category responsible for the highest emissions.
    
    Args:
        breakdown (CategoryBreakdown): The calculated breakdown of emissions per category.
        
    Returns:
        str: The name of the category with the highest emissions.
    """
    sources = {
        "Transportation": breakdown.transportation_kg,
        "Home Energy": breakdown.home_energy_kg,
        "Food Consumption": breakdown.food_kg,
        "Waste": breakdown.waste_kg
    }
    return max(sources, key=sources.get)

def generate_recommendations(request: FootprintRequest, breakdown: CategoryBreakdown) -> Tuple[List[str], ActionPlan, float]:
    """
    Generate personalized recommendations and an actionable plan to reduce the user's footprint.
    
    Args:
        request (FootprintRequest): The user's inputted footprint data.
        breakdown (CategoryBreakdown): The calculated breakdown of emissions.
        
    Returns:
        Tuple[List[str], ActionPlan, float]: A list of text recommendations, a structured ActionPlan, and the expected reduction percentage.
    """
    recommendations = []
    daily = []
    weekly = []
    monthly = []
    
    expected_reduction = 0.0
    
    biggest = get_biggest_source(breakdown)
    
    # Analyze Transportation
    if request.vehicle_type in ["petrol_car", "diesel_car"] and request.commute_distance_km > 10:
        recommendations.append("Switch to carpooling or public transport for your commute twice a week.")
        daily.append(ActionItem(title="Carpool/Transit", description="Use alternative transport instead of driving alone.", impact_percentage=15.0, difficulty="medium"))
        expected_reduction += 15.0
    elif request.flights_per_year > 2:
        recommendations.append("Consider reducing short-haul flights by taking the train.")
        monthly.append(ActionItem(title="Train instead of Flight", description="Replace one flight with train travel.", impact_percentage=10.0, difficulty="medium"))
        expected_reduction += 10.0

    # Analyze Energy
    if request.monthly_electricity_kwh > 300 and request.renewable_energy_percentage < 50:
        recommendations.append("Switch to a renewable energy provider or install solar panels.")
        monthly.append(ActionItem(title="Green Energy Switch", description="Contact your provider to switch to a 100% renewable tariff.", impact_percentage=20.0, difficulty="hard"))
        weekly.append(ActionItem(title="Reduce AC/Heating", description="Adjust your thermostat by 1-2 degrees.", impact_percentage=5.0, difficulty="easy"))
        expected_reduction += 20.0

    # Analyze Food
    if request.diet_type in ["high_meat", "mixed"]:
        recommendations.append("Introduce 2-3 plant-based days per week to lower food emissions.")
        daily.append(ActionItem(title="Meatless Meals", description="Eat a fully plant-based meal today.", impact_percentage=8.0, difficulty="easy"))
        expected_reduction += 8.0

    # Analyze Waste
    if request.recycling_habits in ["poor", "average"] or request.waste_bags_per_week > 2:
        recommendations.append("Improve recycling habits and start composting organic waste.")
        weekly.append(ActionItem(title="Sort Recycling", description="Ensure all plastics, paper, and glass are sorted.", impact_percentage=5.0, difficulty="easy"))
        expected_reduction += 5.0

    # Fallback if profile is already very good
    if not recommendations:
        recommendations.append("You are doing great! Consider offsetting your remaining footprint or advocating in your community.")
        monthly.append(ActionItem(title="Community Advocacy", description="Share your sustainability tips with a neighbor or friend.", impact_percentage=2.0, difficulty="easy"))
        expected_reduction += 2.0
        
    # Ensure lists aren't empty for UI
    if not daily:
        daily.append(ActionItem(title="Unplug Electronics", description="Unplug chargers and appliances when not in use.", impact_percentage=1.0, difficulty="easy"))
    if not weekly:
        weekly.append(ActionItem(title="Review Energy Usage", description="Check your smart meter or utility bill.", impact_percentage=2.0, difficulty="easy"))
    if not monthly:
        monthly.append(ActionItem(title="Calculate Footprint", description="Recalculate your footprint to track progress.", impact_percentage=0.0, difficulty="easy"))

    plan = ActionPlan(daily=daily, weekly=weekly, monthly=monthly)
    
    return recommendations, plan, min(expected_reduction, 50.0) # Cap expected reduction at 50%
