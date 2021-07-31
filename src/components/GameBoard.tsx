import React, { useEffect, useRef, useState } from 'react';
import { Button, Segment } from 'semantic-ui-react';
import { elementPairsCount, getCardElements } from '../utils/cardElements';
import Card from './Card';

type GameBoardProps = {
  moveCount: number;
  bestScore: string;
  handleCompletion: () => void;
  incrementMoveCount: () => void;
};

const GameBoardStyles: Record<string, React.CSSProperties> = {
  container: {
    padding: '12',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridTemplateRows: 'repeat(3, 1fr)',
    justifyItems: 'center',
    alignItems: 'stretch',
    gap: '1rem',
    perspective: '100%',
  },
  scores: {
    display: 'inline-block',
    margin: '1em 0.8rem',
  },
};

const GameBoard = ({
  bestScore,
  moveCount,
  handleCompletion,
  incrementMoveCount,
}: GameBoardProps): JSX.Element => {
  const [cards, setCards] = useState(getCardElements());
  const [openCards, setOpenCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<Record<string, boolean>>({});
  const [disableAll, setDisableAll] = useState(false);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const handleCardClick = (index: number): void => {
    if (disableAll) return;

    if (openCards.length === 1) {
      // On this step we will have two cards in the openCards array...
      setOpenCards((prev) => [...prev, index]);
      // ...so we can disable all interactions with cards (clicks)
      setDisableAll(true);
      incrementMoveCount();
    } else {
      setOpenCards([index]);
    }
  };

  const handleRestart = (): void => {
    setMatchedCards({});
    // Timeout is needed so matchCards will have time to reset
    // and the user won't be able to see positions of the new cards
    timeout.current = setTimeout(() => setCards(getCardElements()), 300);
  };

  const checkIsFlipped = (index: number): boolean => {
    return openCards.includes(index);
  };

  const checkIsMatched = (type: string): boolean => {
    return Boolean(matchedCards[type]);
  };

  useEffect(() => {
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
      }, 300);
    };

    let timeToCheck: NodeJS.Timeout;

    if (openCards.length === 2) {
      timeToCheck = setTimeout(checkMatch, 200);
    }
    return () => {
      clearTimeout(timeToCheck);
    };
  }, [openCards, cards]);

  useEffect(() => {
    const checkCompletion = (): void => {
      if (elementPairsCount === Object.keys(matchedCards).length) {
        handleCompletion();
        // Restart board when user wins
        handleRestart();
      }
    };

    checkCompletion();
  }, [matchedCards, handleCompletion]);

  return (
    <>
      <section style={GameBoardStyles.container}>
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
      </section>
      <Segment textAlign='center' basic as='section'>
        <Segment.Inline>
          <h3 style={GameBoardStyles.scores}>MOVES: {moveCount}</h3>
          <h3 style={GameBoardStyles.scores}>BEST SCORE: {bestScore}</h3>
        </Segment.Inline>
        <Button onClick={handleRestart}>Restart</Button>
      </Segment>
    </>
  );
};

export default GameBoard;
