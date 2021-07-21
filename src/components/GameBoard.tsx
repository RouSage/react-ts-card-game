import React, { useEffect, useRef, useState } from 'react';
import { getCardElements } from '../utils/cardElements';
import Card from './Card';
import './GameBoard.css';

const GameBoard = (): JSX.Element => {
  const [cards, setCards] = useState(getCardElements());
  const [openCards, setOpenCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [disableAll, setDisableAll] = useState(false);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const checkMatch = (): void => {
    const [first, second] = openCards;

    if (cards[first].type === cards[second].type) {
      setMatchedCards((prev) => ({ ...prev, [cards[first].type]: true }));
    }

    // Clear openCards array and enable interactions
    // whether cards matched or not
    timeout.current = setTimeout(() => {
      setOpenCards([]);
      setDisableAll(false);
    }, 500);
  };

  const handleCardClick = (index: number): void => {
    if (disableAll) return;

    if (openCards.length === 1) {
      // On this step we will have two cards in the openCards array
      setOpenCards((prev) => [...prev, index]);
      // so we can disable all interactions with cards (clicks)
      setDisableAll(true);
    } else {
      setOpenCards([index]);
    }
  };

  const checkIsFlipped = (index: number): boolean => {
    return openCards.includes(index);
  };

  const checkIsMatched = (type: string): boolean => {
    return Boolean(matchedCards[type]);
  };

  useEffect(() => {
    let timeToCheck: NodeJS.Timeout;

    if (openCards.length === 2) {
      timeToCheck = setTimeout(checkMatch, 300);
    }
    return () => {
      clearTimeout(timeToCheck);
    };
  }, [openCards]);

  return (
    <div className='container'>
      {cards.map((card, index) => (
        <Card
          card={card}
          key={card.id}
          index={index}
          /*
           * Card stays flipped when it is opened (present in openCards array)
           * or already matched
           */
          isFlipped={checkIsFlipped(index) || checkIsMatched(card.type)}
          onCardClick={handleCardClick}
        />
      ))}
    </div>
  );
};

export default GameBoard;
