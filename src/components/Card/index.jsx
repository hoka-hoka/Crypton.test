import React from 'react';
import { lang, langData } from '../../constants';
import Heart from '../../common/Heart';
import './Card.scss';

const Card = ({ card, cardFavorites, updateState }) => {
  const recordToFavorites = () => {
    const favorites = [...cardFavorites];
    favorites.push(card);
    favorites.sort((a, b) => a.id - b.id);
    updateState({ update: true })({ cardFavorites: [...favorites] });
  };

  const deleteToFavorite = () => {
    const favorites = [...cardFavorites];
    const index = favorites.findIndex((item) => item.id == card.id);
    favorites.splice(index, 1);
    updateState({ update: true })({ cardFavorites: [...favorites] });
  };

  const updateFavoriteList = (isActive) => {
    console.log(isActive);
    if (isActive) {
      recordToFavorites();
    } else {
      deleteToFavorite();
    }
  };

  return (
    <>
      <Heart
        forId={card.id}
        callback={(isActive) => updateFavoriteList(isActive)}
      />
      <a className="card" href="/test">
        <img className="card__img" src={card.image} alt={card.name} />
        <div className="card__name">{`${lang[langData.name]}: ${
          card.name
        }`}</div>
        <div className="card__homeworld">
          {`${lang[langData.homeworld]}: ${card.homeworld}`}
        </div>
      </a>
    </>
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
