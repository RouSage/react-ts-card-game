import { render, screen } from '@testing-library/react';
import React from 'react';
import GameBoard from './GameBoard';

describe('GameBoard', () => {
  test('should render correctly', () => {
    const handleCompletion = jest.fn();
    const incrementMovement = jest.fn();

    render(
      <GameBoard
        bestScore='unknown'
        moveCount={0}
        incrementMoveCount={incrementMovement}
        handleCompletion={handleCompletion}
      />
    );

    expect(screen.getAllByAltText(/Card/)).toHaveLength(12);
    expect(screen.getByText(/MOVES/)).toBeInTheDocument();
    expect(screen.getByText(/MOVES/)).toHaveTextContent('MOVES: 0');
    expect(screen.getByText(/BEST SCORE/)).toBeInTheDocument();
    expect(screen.getByText(/Restart/)).toBeInTheDocument();
  });
});
