import React from 'react';
import ReactCardFlip from 'react-card-flip';
import web from '../assets/web.png';
import { CardElement } from '../utils/cardElements';

type CardProps = {
  card: CardElement;
  isFlipped: boolean;
  onCardClick: (id: number) => void;
};

const CardStyle: { [key: string]: React.CSSProperties } = {
  container: {
    width: '100%',
    maxWidth: '140px',
    height: '100%',
    border: '1px, solid, #DEDEDE',
    boxShadow: '0 0 4px 4px #DEDEDE',
    borderRadius: 4,
    padding: '0.5rem',
  },
  card: {
    cursor: 'pointer',
  },
  img: {
    display: 'block',
    width: '100%',
    height: 'auto',
  },
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
    <ReactCardFlip
      isFlipped={isFlipped}
      containerStyle={CardStyle.container}
      cardStyles={{ front: CardStyle.card, back: CardStyle.card }}
    >
      <div
        key='front'
        onClick={handleCardClick}
        role='button'
        tabIndex={-1}
        onKeyDown={handleCardKeyDown}
      >
        <img
          src={web}
          alt='Card'
          width={100}
          height={100}
          style={CardStyle.img}
        />
      </div>
      <div
        key='back'
        onClick={handleCardClick}
        role='button'
        tabIndex={-1}
        onKeyDown={handleCardKeyDown}
      >
        <img
          src={card.image}
          alt={card.type}
          width={100}
          height={100}
          style={CardStyle.img}
        />
      </div>
    </ReactCardFlip>
  );
};

export default Card;
