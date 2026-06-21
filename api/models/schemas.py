from pydantic import BaseModel, Field
from typing import List, Optional

class FootprintRequest(BaseModel):
    # Transportation
    commute_distance_km: float = Field(default=0, ge=0, description="Daily commute distance in km")
    vehicle_type: str = Field(default="petrol_car", description="Type of vehicle: petrol_car, diesel_car, electric_car, public_transport, none")
    flights_per_year: int = Field(default=0, ge=0, description="Number of short-to-medium haul flights per year")
    carpool_frequency: str = Field(default="never", description="never, sometimes, often, always")
    public_transit_hours: float = Field(default=0, ge=0, description="Hours spent on public transit per week")
    
    # Home Energy
    monthly_electricity_kwh: float = Field(default=0, ge=0, description="Monthly electricity consumption in kWh")
    renewable_energy_percentage: float = Field(default=0, ge=0, le=100, description="Percentage of electricity from renewable sources")
    heating_source: str = Field(default="natural_gas", description="natural_gas, electricity, oil, none")
    living_space_sqm: float = Field(default=100, ge=0, description="Approximate living space in square meters")
    
    # Food Consumption
    diet_type: str = Field(default="mixed", description="Diet type: vegan, vegetarian, mixed, high_meat")
    local_food_sourcing: str = Field(default="some", description="rarely, some, most, almost_all")
    beef_meals_per_week: int = Field(default=1, ge=0, description="Number of beef-heavy meals per week")
    food_waste_frequency: str = Field(default="sometimes", description="rarely, sometimes, often")
    
    # Waste
    recycling_habits: str = Field(default="average", description="Recycling habits: poor, average, good, excellent")
    waste_bags_per_week: float = Field(default=1, ge=0, description="Number of standard waste bags generated per week")
    composting_habit: str = Field(default="no", description="yes, no")
    packaging_awareness: str = Field(default="somewhat", description="dont_care, somewhat, very_conscious")

class CategoryBreakdown(BaseModel):
    transportation_kg: float
    home_energy_kg: float
    food_kg: float
    waste_kg: float

class ActionItem(BaseModel):
    title: str
    description: str
    impact_percentage: float
    difficulty: str # easy, medium, hard

class ActionPlan(BaseModel):
    daily: List[ActionItem]
    weekly: List[ActionItem]
    monthly: List[ActionItem]

class FootprintResponse(BaseModel):
    monthly_emissions_kg: float
    annual_emissions_kg: float
    breakdown: CategoryBreakdown
    sustainability_score: int
    score_category: str # Excellent, Good, Average, High Impact
    biggest_emission_source: str
    expected_reduction_percentage: float
    recommendations: List[str]
    action_plan: ActionPlan

class SimulatorRequest(BaseModel):
    current_footprint: FootprintRequest
    action_type: str # e.g., "reduce_car", "switch_renewable", "vegan_diet"
    action_value: float # e.g., reduce car by 20%, switch 50% to renewable
