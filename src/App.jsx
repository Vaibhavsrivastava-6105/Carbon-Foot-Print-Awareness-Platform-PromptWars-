import { useState } from 'react';
import { Calculator } from './features/Calculator';
import { Dashboard } from './features/Dashboard';
import { Simulator } from './features/Simulator';
import { Globe2 } from 'lucide-react';
import './index.css';

function App() {
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState(null);
  const [showSimulator, setShowSimulator] = useState(false);

  const handleResult = (data, inputData) => {
    setResult(data);
    setFormData(inputData);
    setShowSimulator(false);
  };

  const handleBack = () => {
    setResult(null);
    setShowSimulator(false);
  };

  return (
    <div className="container">
      <header className="flex-center" style={{ flexDirection: 'column', marginBottom: '1.5rem', textAlign: 'center' }}>
        <div 
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '0.5rem', cursor: 'pointer' }}
          onClick={handleBack}
          title="Return to Home"
        >
          <Globe2 size={40} color="var(--accent-blue)" />
          <h1 className="text-gradient" style={{ marginBottom: 0, fontSize: '2.25rem' }}>EcoGuide AI</h1>
        </div>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', fontSize: '0.9rem', margin: 0 }}>
          Understand your carbon footprint, get personalized AI recommendations, and simulate real-world impact.
        </p>
      </header>

      <main>
        {!result ? (
          <Calculator onResult={handleResult} />
        ) : showSimulator ? (
          <Simulator 
            currentFootprintData={formData} 
            originalResult={result} 
            onClose={() => setShowSimulator(false)} 
          />
        ) : (
          <Dashboard 
            result={result} 
            onBack={handleBack} 
            onSimulate={() => setShowSimulator(true)} 
          />
        )}
      </main>
      
      <footer style={{ marginTop: '4rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
        <p>&copy; {new Date().getFullYear()} EcoGuide AI. Building a sustainable future together.</p>
      </footer>
    </div>
  );
}

export default App;
