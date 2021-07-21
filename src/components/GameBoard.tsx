import React, { useState } from 'react';
import { getCardElements } from '../utils/cardElements';
import Card from './Card';
import './GameBoard.css';

const GameBoard = (): JSX.Element => {
  const [cards, setCards] = useState(getCardElements());
  const [openCards, setOpenCards] = useState<number[]>([]);

  const handleCardClick = (id: number): void => {
    if (openCards.length === 1) {
      setOpenCards((prev) => [...prev, id]);
    } else {
      setOpenCards([id]);
    }
  };

  const checkIsFlipped = (id: number): boolean => {
    return openCards.includes(id);
  };

  return (
    <div className='container'>
      {cards.map((card) => (
        <Card
          card={card}
          key={card.id}
          isFlipped={checkIsFlipped(card.id)}
          onCardClick={handleCardClick}
        />
      ))}
    </div>
  );
};

export default GameBoard;
