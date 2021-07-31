import React, { useState } from 'react';
import useLocalStorage from 'react-use-localstorage';
import { Button, Modal, Segment } from 'semantic-ui-react';
import GameBoard from './components/GameBoard';
import { getCardElements } from './utils/cardElements';

const AppStyles: Record<string, React.CSSProperties> = {
  main: {
    margin: '2rem auto',
    maxWidth: '50vw',
  },
  scores: {
    display: 'inline-block',
    margin: '1em 0.8rem',
  },
};

const App = (): JSX.Element => {
  const [cards, setCards] = useState(getCardElements());
  const [bestScore, setBestScore] = useLocalStorage(
    'bestScore',
    Number.MAX_SAFE_INTEGER.toString()
  );
  const [moveCount, setMoveCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const incrementMoveCount = (): void => {
    setMoveCount(moveCount + 1);
  };

  const handleRestart = (): void => {
    setOpenModal(false);
    setCards(getCardElements());
    setMoveCount(0);
  };

  const handleCompletion = (): void => {
    const newBestScore = Math.min(moveCount, parseInt(bestScore, 10));
    setBestScore(newBestScore.toString());
    setOpenModal(true);
  };

  return (
    <main style={AppStyles.main}>
      <GameBoard
        cards={cards}
        handleCompletion={handleCompletion}
        incrementMoveCount={incrementMoveCount}
      />
      <Segment textAlign='center' basic as='section'>
        <Segment.Inline>
          <h3 style={AppStyles.scores}>MOVES: {moveCount}</h3>
          <h3 style={AppStyles.scores}>BEST SCORE: {bestScore}</h3>
        </Segment.Inline>
        <Button onClick={handleRestart}>Restart</Button>
      </Segment>
      {openModal && (
        <Modal open={openModal} onClose={handleRestart}>
          <Modal.Header>Congratulations</Modal.Header>
          <Modal.Content>
            <p>
              {`You completed the game in ${moveCount} moves! Your best score is ${bestScore} moves.`}
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button positive onClick={handleRestart}>
              Restart
            </Button>
          </Modal.Actions>
        </Modal>
      )}
    </main>
  );
};

export default App;
