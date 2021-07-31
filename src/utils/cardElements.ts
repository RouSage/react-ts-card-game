import css from '../assets/css.png';
import html from '../assets/html.png';
import js from '../assets/js.png';
import node from '../assets/node.png';
import react from '../assets/react.png';
import redux from '../assets/redux.png';

export type CardElement = {
  id: number;
  type: string;
  image: string;
};

const images: Record<string, string> = {
  css,
  html,
  js,
  react,
  redux,
  node,
};

export const elementPairsCount = Object.keys(images).length;

const buildCardElements = (): CardElement[] => {
  let id = 0;

  const cardElements: CardElement[] = Object.keys(images).reduce(
    (result: CardElement[], item: string) => {
      const buildCardElement = (): CardElement => ({
        id: id++,
        image: images[item],
        type: item,
      });

      // Call buildCardElement() two times so we have
      // two copies of each image
      return [...result, buildCardElement(), buildCardElement()];
    },
    []
  );

  return cardElements;
};

const shuffleElements = (elements: CardElement[]): void => {
  elements.sort(() => Math.random() - 0.5);
};

export const getCardElements = (): CardElement[] => {
  const cardElements = buildCardElements();
  shuffleElements(cardElements);
  return cardElements;
};
