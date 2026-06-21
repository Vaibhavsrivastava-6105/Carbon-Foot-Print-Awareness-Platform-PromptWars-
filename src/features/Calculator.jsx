import { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { InputField } from '../components/InputField';
import { calculateFootprint } from '../api';
import { Leaf, Car, Zap, Utensils, Trash2, Plane, Navigation, ShieldCheck, Droplets, Users, TrainFront, Flame, Home, MapPin, Beef, RefreshCw, Package } from 'lucide-react';

export const Calculator = ({ onResult }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    commute_distance_km: '',
    vehicle_type: 'petrol_car',
    flights_per_year: '',
    carpool_frequency: 'never',
    public_transit_hours: '',
    
    monthly_electricity_kwh: '',
    renewable_energy_percentage: '',
    heating_source: 'natural_gas',
    living_space_sqm: '',
    
    diet_type: 'mixed',
    local_food_sourcing: 'some',
    beef_meals_per_week: '',
    food_waste_frequency: 'sometimes',
    
    recycling_habits: 'average',
    waste_bags_per_week: '',
    composting_habit: 'no',
    packaging_awareness: 'somewhat'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const isNumeric = ['commute_distance_km', 'flights_per_year', 'public_transit_hours', 'monthly_electricity_kwh', 'renewable_energy_percentage', 'living_space_sqm', 'beef_meals_per_week', 'waste_bags_per_week'].includes(name);
    setFormData(prev => ({ ...prev, [name]: isNumeric ? (value === '' ? '' : Number(value)) : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await calculateFootprint(formData);
      onResult(data, formData);
    } catch (error) {
      console.error(error);
      alert("Error calculating footprint. Please ensure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="animate-fade-in" style={{ padding: '1.5rem' }}>
      
      <div className="flex-center" style={{ flexDirection: 'column', marginBottom: '1.25rem' }}>
        <h2 className="flex-center" style={{ color: 'var(--text-primary)' }}>
          <Leaf size={28} color="var(--accent-green)" style={{ marginRight: '12px' }} />
          Carbon Calculator
        </h2>
        <p style={{ color: 'var(--text-secondary)' }}>Fill in your details to calculate your carbon footprint</p>
      </div>

      <form onSubmit={handleSubmit}>
        
        <div className="grid-2x2">
          
          {/* Transportation */}
          <div className="theme-card transport">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div className="theme-icon-container transport"><Car size={20} /></div>
              <div>
                <h3 style={{ color: 'var(--theme-transport-icon)', marginBottom: 0 }}>Transportation</h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Your daily travel impact</div>
              </div>
            </div>

            <InputField 
              label="Daily Commute" 
              id="commute" 
              name="commute_distance_km" 
              type="number" min="0" 
              value={formData.commute_distance_km} 
              onChange={handleChange} 
              placeholder="e.g. 15" 
              icon={<Navigation size={16} />}
              unit="km"
              required 
            />
            
            <div className="input-group">
              <label className="input-label">Vehicle Type</label>
              <div className="input-wrapper">
                <div className="input-icon"><Car size={16} /></div>
                <select name="vehicle_type" className="input-field" value={formData.vehicle_type} onChange={handleChange}>
                  <option value="petrol_car">Petrol Car</option>
                  <option value="diesel_car">Diesel Car</option>
                  <option value="electric_car">Electric Car</option>
                  <option value="public_transport">Public Transport</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Carpool Frequency</label>
              <div className="input-wrapper">
                <div className="input-icon"><Users size={16} /></div>
                <select name="carpool_frequency" className="input-field" value={formData.carpool_frequency} onChange={handleChange}>
                  <option value="never">Never</option>
                  <option value="sometimes">Sometimes</option>
                  <option value="often">Often</option>
                  <option value="always">Always</option>
                </select>
              </div>
            </div>

            <InputField 
              label="Public Transit Time" 
              id="transit" 
              name="public_transit_hours" 
              type="number" min="0" step="0.5"
              value={formData.public_transit_hours} 
              onChange={handleChange} 
              placeholder="e.g. 5" 
              icon={<TrainFront size={16} />}
              unit="hours/wk"
              required 
            />

            <InputField 
              label="Flights per Year" 
              id="flights" 
              name="flights_per_year" 
              type="number" min="0" 
              value={formData.flights_per_year} 
              onChange={handleChange} 
              placeholder="e.g. 2" 
              icon={<Plane size={16} />}
              unit="flights"
              required 
            />
          </div>

          {/* Home Energy */}
          <div className="theme-card energy">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div className="theme-icon-container energy"><Zap size={20} /></div>
              <div>
                <h3 style={{ color: 'var(--theme-energy-icon)', marginBottom: 0 }}>Home Energy</h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Your energy consumption</div>
              </div>
            </div>

            <InputField 
              label="Monthly Electricity" 
              id="electricity" 
              name="monthly_electricity_kwh" 
              type="number" min="0" 
              value={formData.monthly_electricity_kwh} 
              onChange={handleChange} 
              placeholder="e.g. 250" 
              icon={<Zap size={16} />}
              unit="kWh"
              required 
            />
            
            <InputField 
              label="Renewable Energy" 
              id="renewable" 
              name="renewable_energy_percentage" 
              type="number" min="0" max="100" 
              value={formData.renewable_energy_percentage} 
              onChange={handleChange} 
              placeholder="e.g. 50" 
              icon={<Leaf size={16} />}
              unit="%"
              required 
            />

            <div className="input-group">
              <label className="input-label">Heating Source</label>
              <div className="input-wrapper">
                <div className="input-icon"><Flame size={16} /></div>
                <select name="heating_source" className="input-field" value={formData.heating_source} onChange={handleChange}>
                  <option value="natural_gas">Natural Gas</option>
                  <option value="electricity">Electricity</option>
                  <option value="oil">Oil</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>

            <InputField 
              label="Living Space" 
              id="space" 
              name="living_space_sqm" 
              type="number" min="0" 
              value={formData.living_space_sqm} 
              onChange={handleChange} 
              placeholder="e.g. 100" 
              icon={<Home size={16} />}
              unit="sqm"
              required 
            />
          </div>

          {/* Food */}
          <div className="theme-card food">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div className="theme-icon-container food"><Utensils size={20} /></div>
              <div>
                <h3 style={{ color: 'var(--theme-food-icon)', marginBottom: 0 }}>Food</h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Your diet choices</div>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Diet Type</label>
              <div className="input-wrapper">
                <div className="input-icon"><Leaf size={16} /></div>
                <select name="diet_type" className="input-field" value={formData.diet_type} onChange={handleChange}>
                  <option value="vegan">Vegan</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="mixed">Mixed</option>
                  <option value="high_meat">High Meat</option>
                </select>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Local Food Sourcing</label>
              <div className="input-wrapper">
                <div className="input-icon"><MapPin size={16} /></div>
                <select name="local_food_sourcing" className="input-field" value={formData.local_food_sourcing} onChange={handleChange}>
                  <option value="rarely">Rarely</option>
                  <option value="some">Some</option>
                  <option value="most">Most</option>
                  <option value="almost_all">Almost All</option>
                </select>
              </div>
            </div>

            <InputField 
              label="Beef/Red Meat Meals" 
              id="beef" 
              name="beef_meals_per_week" 
              type="number" min="0" 
              value={formData.beef_meals_per_week} 
              onChange={handleChange} 
              placeholder="e.g. 2" 
              icon={<Beef size={16} />}
              unit="meals/wk"
              required 
            />

            <div className="input-group">
              <label className="input-label">Food Waste Frequency</label>
              <div className="input-wrapper">
                <div className="input-icon"><Trash2 size={16} /></div>
                <select name="food_waste_frequency" className="input-field" value={formData.food_waste_frequency} onChange={handleChange}>
                  <option value="rarely">Rarely</option>
                  <option value="sometimes">Sometimes</option>
                  <option value="often">Often</option>
                </select>
              </div>
            </div>
          </div>

          {/* Waste */}
          <div className="theme-card waste">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div className="theme-icon-container waste"><Trash2 size={20} /></div>
              <div>
                <h3 style={{ color: 'var(--theme-waste-icon)', marginBottom: 0 }}>Waste</h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Your waste management habits</div>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Recycling Habits</label>
              <div className="input-wrapper">
                <div className="input-icon"><Droplets size={16} /></div>
                <select name="recycling_habits" className="input-field" value={formData.recycling_habits} onChange={handleChange}>
                  <option value="poor">Poor</option>
                  <option value="average">Average</option>
                  <option value="good">Good</option>
                  <option value="excellent">Excellent</option>
                </select>
              </div>
            </div>

            <InputField 
              label="Waste Bags / Week" 
              id="waste_bags" 
              name="waste_bags_per_week" 
              type="number" min="0" step="0.5" 
              value={formData.waste_bags_per_week} 
              onChange={handleChange} 
              placeholder="e.g. 2" 
              icon={<Trash2 size={16} />}
              unit="bags"
              required 
            />

            <div className="input-group">
              <label className="input-label">Do you compost?</label>
              <div className="input-wrapper">
                <div className="input-icon"><RefreshCw size={16} /></div>
                <select name="composting_habit" className="input-field" value={formData.composting_habit} onChange={handleChange}>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Packaging Awareness</label>
              <div className="input-wrapper">
                <div className="input-icon"><Package size={16} /></div>
                <select name="packaging_awareness" className="input-field" value={formData.packaging_awareness} onChange={handleChange}>
                  <option value="dont_care">Don't really care</option>
                  <option value="somewhat">Somewhat conscious</option>
                  <option value="very_conscious">Very conscious</option>
                </select>
              </div>
            </div>
          </div>

        </div>

        <div className="flex-between" style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            <ShieldCheck size={16} color="var(--accent-green)" style={{ marginRight: '6px' }}/>
            Your data is secure and private
          </div>
          
          <Button type="submit" disabled={loading} style={{ minWidth: '300px' }}>
            {loading ? 'Calculating...' : <><Leaf size={18} style={{ marginRight: '8px' }}/> Calculate My Footprint</>}
          </Button>

          <div style={{ display: 'flex', alignItems: 'center', color: 'var(--accent-green)', fontSize: '0.875rem', fontWeight: '500' }}>
            <Leaf size={16} style={{ marginRight: '6px' }}/>
            Every action counts!
          </div>
        </div>

      </form>
    </Card>
  );
};
