import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button } from '../src/components/Button';
import { Card } from '../src/components/Card';
import { InputField } from '../src/components/InputField';

describe('UI Components', () => {
  it('renders Button correctly', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('btn-primary');
  });

  it('renders Card correctly', () => {
    render(<Card>Card Content</Card>);
    expect(screen.getByText('Card Content')).toBeInTheDocument();
    expect(screen.getByText('Card Content')).toHaveClass('glass-panel');
  });

  it('renders InputField correctly and handles input', () => {
    render(<InputField label="Test Input" id="test" />);
    const input = screen.getByRole('textbox');
    expect(screen.getByLabelText('Test Input')).toBeInTheDocument();
    
    fireEvent.change(input, { target: { value: '123' } });
    expect(input.value).toBe('123');
  });
});
