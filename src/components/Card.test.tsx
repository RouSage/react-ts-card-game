import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { CardElement, getCardElements } from '../utils/cardElements';
import Card from './Card';

describe('Card', () => {
  test('should render correctly', () => {
    const card: CardElement = getCardElements()[0];
    const onClick = jest.fn();

    render(
      <Card card={card} index={0} isFlipped={false} onCardClick={onClick} />
    );

    expect(screen.getAllByRole('button')).toHaveLength(2);
    expect(screen.getByAltText(/Card/)).toBeInTheDocument();
    expect(screen.getByAltText(card.type)).toBeInTheDocument();
  });

  test('click handler should be called', () => {
    const card: CardElement = getCardElements()[0];

    const onClick = jest.fn();

    render(
      <Card card={card} index={0} isFlipped={false} onCardClick={onClick} />
    );

    screen.debug();

    userEvent.click(screen.getByAltText(/Card/), { bubbles: true });
    userEvent.click(screen.getByAltText(card.type), { bubbles: true });
    expect(onClick).toHaveBeenCalledTimes(2);
  });
});
