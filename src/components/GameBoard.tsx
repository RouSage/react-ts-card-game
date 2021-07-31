import React, { useEffect, useRef, useState } from 'react';
import { CardElement } from '../utils/cardElements';
import Card from './Card';
import './GameBoard.css';

type GameBoardProps = {
  cards: CardElement[];
  handleCompletion: () => void;
  incrementMoveCount: () => void;
};

const GameBoard = ({
  cards,
  handleCompletion,
  incrementMoveCount,
}: GameBoardProps): JSX.Element => {
  const [openCards, setOpenCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<Record<string, boolean>>({});
  const [disableAll, setDisableAll] = useState(false);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const checkCompletion = (): void => {
    if (Math.floor(cards.length / 2) === Object.keys(matchedCards).length) {
      handleCompletion();
    }
  };

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
      incrementMoveCount();
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

  useEffect(() => {
    checkCompletion();
  }, [matchedCards]);

  useEffect(() => {
    setMatchedCards({});
  }, [cards]);

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
