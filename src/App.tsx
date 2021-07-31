import React, { useState } from 'react';
import useLocalStorage from 'react-use-localstorage';
import { Button, Modal } from 'semantic-ui-react';
import GameBoard from './components/GameBoard';

const AppStyles: React.CSSProperties = {
  margin: '2rem auto',
  maxWidth: '50vw',
};

const App = (): JSX.Element => {
  const [bestScore, setBestScore] = useLocalStorage(
    'bestScore',
    Number.MAX_SAFE_INTEGER.toString()
  );
  const [moveCount, setMoveCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const incrementMoveCount = (): void => {
    setMoveCount(moveCount + 1);
  };

  const resetStats = (): void => {
    setOpenModal(false);
    setMoveCount(0);
  };

  const handleCompletion = (): void => {
    const newBestScore = Math.min(moveCount, parseInt(bestScore, 10));
    setBestScore(newBestScore.toString());
    setOpenModal(true);
  };

  return (
    <main style={AppStyles}>
      <GameBoard
        moveCount={moveCount}
        bestScore={
          bestScore === Number.MAX_SAFE_INTEGER.toString()
            ? 'unknown'
            : bestScore
        }
        handleCompletion={handleCompletion}
        incrementMoveCount={incrementMoveCount}
      />
      {openModal && (
        <Modal open={openModal}>
          <Modal.Header>Congratulations</Modal.Header>
          <Modal.Content>
            <p>
              {`You completed the game in ${moveCount} moves! Your best score is ${bestScore} moves.`}
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button positive onClick={resetStats}>
              Close
            </Button>
          </Modal.Actions>
        </Modal>
      )}
    </main>
  );
};

export default App;
