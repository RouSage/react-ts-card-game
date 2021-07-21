import React from 'react';
import ReactCardFlip from 'react-card-flip';

type CardElement = {
  id: number;
  type: string;
  image: string;
};

type CardProps = {
  card: CardElement;
  isFlipped: boolean;
  onCardClick: (id: number) => void;
};

const Card = ({ card, isFlipped, onCardClick }: CardProps): JSX.Element => {
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    onCardClick(card.id);
  };

  const handleCardKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div>
      <ReactCardFlip isFlipped={isFlipped}>
        <div
          onClick={handleCardClick}
          role='button'
          tabIndex={-1}
          onKeyDown={handleCardKeyDown}
        >
          <img src={card.image} alt={card.type} />
        </div>
        <div
          onClick={handleCardClick}
          role='button'
          tabIndex={-1}
          onKeyDown={handleCardKeyDown}
        >
          <img src='' alt='' />
        </div>
      </ReactCardFlip>
    </div>
  );
};

export default Card;
