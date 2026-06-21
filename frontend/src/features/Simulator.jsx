import { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { simulateAction } from '../api';
import { Activity, ArrowRight, X } from 'lucide-react';

export const Simulator = ({ currentFootprintData, originalResult, onClose }) => {
  const [actionType, setActionType] = useState('reduce_car');
  const [actionValue, setActionValue] = useState(20);
  const [simulatedResult, setSimulatedResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSimulate = async () => {
    setLoading(true);
    try {
      const data = await simulateAction({
        current_footprint: currentFootprintData,
        action_type: actionType,
        action_value: actionValue
      });
      setSimulatedResult(data);
    } catch (error) {
      console.error(error);
      alert("Error simulating action.");
    } finally {
      setLoading(false);
    }
  };

  const getReduction = () => {
    if (!simulatedResult) return 0;
    const diff = originalResult.annual_emissions_kg - simulatedResult.annual_emissions_kg;
    return diff > 0 ? diff : 0;
  };

  return (
    <Card className="animate-fade-in" style={{ position: 'relative' }}>
      <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
        <X size={24} />
      </button>
      
      <h2 style={{ marginBottom: '1.5rem' }}><Activity size={24} style={{ verticalAlign: 'middle', marginRight: '8px' }}/> Impact Simulator</h2>
      
      <div className="grid-2">
        <div>
          <div className="input-group">
            <label className="input-label">Action Scenario</label>
            <select className="input-field" value={actionType} onChange={e => setActionType(e.target.value)}>
              <option value="reduce_car">Reduce Car Usage (%)</option>
              <option value="switch_renewable">Increase Renewable Energy (%)</option>
              <option value="vegan_diet">Switch to Vegan Diet</option>
              <option value="reduce_waste">Reduce Waste (%)</option>
            </select>
          </div>
          
          {actionType !== 'vegan_diet' && (
            <div className="input-group">
              <label className="input-label">Amount: {actionValue}%</label>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={actionValue} 
                onChange={e => setActionValue(Number(e.target.value))}
                style={{ width: '100%', marginTop: '0.5rem' }}
              />
            </div>
          )}

          <Button onClick={handleSimulate} disabled={loading} style={{ width: '100%', marginTop: '1rem' }}>
            {loading ? 'Simulating...' : 'Run Simulation'}
          </Button>
        </div>

        <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h4 style={{ color: 'var(--text-secondary)', marginBottom: '1rem', textAlign: 'center' }}>Projected Annual Impact</h4>
          
          <div className="flex-center" style={{ gap: '1rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{originalResult.annual_emissions_kg}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Current (kg)</div>
            </div>
            
            <ArrowRight color="var(--text-secondary)" />
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: simulatedResult ? 'var(--accent-green)' : 'inherit' }}>
                {simulatedResult ? simulatedResult.annual_emissions_kg : '-'}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Simulated (kg)</div>
            </div>
          </div>

          {simulatedResult && (
            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <div style={{ color: 'var(--accent-green)', fontWeight: 'bold', fontSize: '1.2rem' }}>
                -{getReduction().toFixed(1)} kg CO₂e / year
              </div>
              
              <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Community Impact</div>
                <div style={{ fontSize: '0.85rem' }}>
                  If 1,000 people did this, we would save <strong>{((getReduction() * 1000) / 1000).toFixed(1)} tons</strong> of CO₂ annually!
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
