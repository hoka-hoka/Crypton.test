import React, { useState } from 'react';
import { lang, langData } from '../../constants';
import './List.scss';

const List = ({ cardList }) => {
  const [state, setState] = useState();
  return (
    <div className="list">
      {cardList.map((card) => (
        <div className="list__item" key={card.id}>
          <div className="list__name">{`${lang[langData.name]}: ${
            card.name
          }`}</div>
          <div className="list__homeworld">{`${lang[langData.homeworld]}: ${
            card.homeworld
          }`}</div>
        </div>
      ))}
    </div>
  );
};

export default List;
