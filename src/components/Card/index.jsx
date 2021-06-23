import React, { useState } from 'react';
import { lang, langData } from '../../constants';
import './Card.scss';

const Card = ({ card }) => {
  const [state, setState] = useState();
  return (
    <a className="card" href="/test">
      <img className="card__img" src={card.image} alt={card.name} />
      <div className="card__name">{`${lang[langData.name]}: ${card.name}`}</div>
      <div className="card__homeworld">{`${lang[langData.homeworld]}: ${
        card.homeworld
      }`}</div>
    </a>
  );
};

Card.defaultProps = {
  card: {
    image: '',
    name: '',
    homeworld: '',
  },
};

export default Card;
