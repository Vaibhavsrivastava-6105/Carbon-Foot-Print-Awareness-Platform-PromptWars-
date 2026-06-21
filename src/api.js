const API_BASE = import.meta.env.VITE_API_URL || '/api';

export const calculateFootprint = async (data) => {
  const response = await fetch(`${API_BASE}/calculate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    throw new Error('Failed to calculate footprint');
  }
  return response.json();
};

export const simulateAction = async (data) => {
  const response = await fetch(`${API_BASE}/simulate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    throw new Error('Failed to simulate action');
  }
  return response.json();
};
