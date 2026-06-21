import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App Component', () => {
  it('renders the main application without crashing', () => {
    const { getByText } = render(<App />);
    expect(getByText('EcoGuide AI')).toBeDefined();
    expect(getByText('Carbon Calculator')).toBeDefined();
  });
});
