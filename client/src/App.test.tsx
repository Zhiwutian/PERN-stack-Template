import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders server hello message from API', async () => {
    render(<App />);

    expect(
      await screen.findByRole('heading', { name: 'Hello, World!' }),
    ).toBeInTheDocument();
  });
});
