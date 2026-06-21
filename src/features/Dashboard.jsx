import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Target, Calendar, CheckCircle2, AlertTriangle, ArrowLeft } from 'lucide-react';

const COLORS = ['#58a6ff', '#2ea043', '#d29922', '#f85149'];

export const Dashboard = ({ result, onBack, onSimulate }) => {
  if (!result) return null;

  const breakdownData = [
    { name: 'Transportation', value: result.breakdown.transportation_kg },
    { name: 'Home Energy', value: result.breakdown.home_energy_kg },
    { name: 'Food', value: result.breakdown.food_kg },
    { name: 'Waste', value: result.breakdown.waste_kg },
  ].filter(item => item.value > 0);

  const getScoreColor = (score) => {
    if (score >= 75) return 'var(--accent-green)';
    if (score >= 50) return '#d29922'; // yellow
    return '#f85149'; // red
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="flex-between">
        <h2 className="text-gradient">Your Carbon Profile</h2>
        <Button variant="secondary" onClick={onBack}>
          <ArrowLeft size={16} style={{ marginRight: '8px' }}/> Recalculate
        </Button>
      </div>

      <div className="grid-2">
        <Card className="flex-center" style={{ flexDirection: 'column' }}>
          <h3 style={{ color: 'var(--text-secondary)' }}>Sustainability Score</h3>
          <div style={{ 
            fontSize: '4rem', 
            fontWeight: 'bold', 
            color: getScoreColor(result.sustainability_score),
            textShadow: `0 0 20px ${getScoreColor(result.sustainability_score)}40`
          }}>
            {result.sustainability_score}
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: '500', marginBottom: '1rem' }}>
            {result.score_category}
          </div>
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
            Total: <strong>{result.monthly_emissions_kg}</strong> kg CO₂e / month
          </div>
        </Card>

        <Card>
          <h3>Emissions Breakdown</h3>
          <div style={{ height: '250px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={breakdownData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {breakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
          <h3><Target size={24} style={{ verticalAlign: 'middle', marginRight: '8px' }}/> AI Advisor Insights</h3>
          <Button onClick={onSimulate} variant="secondary">Open Simulator</Button>
        </div>
        
        <div style={{ background: 'rgba(88, 166, 255, 0.1)', borderLeft: '4px solid var(--accent-blue)', padding: '1rem', borderRadius: '4px', marginBottom: '1.5rem' }}>
          <strong>Biggest Source:</strong> {result.biggest_emission_source}
        </div>

        <ul style={{ paddingLeft: '1.5rem', marginBottom: '2rem', color: 'var(--text-primary)' }}>
          {result.recommendations.map((rec, idx) => (
            <li key={idx} style={{ marginBottom: '0.5rem' }}>{rec}</li>
          ))}
        </ul>

        <h4><Calendar size={20} style={{ verticalAlign: 'middle', marginRight: '8px' }}/> Personalized Action Plan</h4>
        <div className="grid-2" style={{ marginTop: '1rem' }}>
          
          <div style={{ background: 'var(--bg-surface-hover)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
            <h5 style={{ color: 'var(--accent-green)' }}>Daily Actions</h5>
            {result.action_plan.daily.map((action, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                <CheckCircle2 size={16} color="var(--accent-green)" style={{ flexShrink: 0, marginTop: '2px' }}/>
                <div>
                  <strong>{action.title}</strong>
                  <div style={{ color: 'var(--text-secondary)' }}>{action.description}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: 'var(--bg-surface-hover)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
            <h5 style={{ color: 'var(--accent-blue)' }}>Weekly Goals</h5>
            {result.action_plan.weekly.map((action, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                <CheckCircle2 size={16} color="var(--accent-blue)" style={{ flexShrink: 0, marginTop: '2px' }}/>
                <div>
                  <strong>{action.title}</strong>
                  <div style={{ color: 'var(--text-secondary)' }}>{action.description}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </Card>
    </div>
  );
};
