import React, { useState } from 'react';
import Card from '../Card';
import './List.scss';

const List = ({ list, cardFavorites, updateState }) => {
  const [state, setState] = useState();

  return (
    <div className="list">
      {list.map((card) => (
        <div className="list__item" key={card.id}>
          <Card
            card={card}
            cardFavorites={cardFavorites}
            updateState={updateState}
          />
        </div>
      ))}
    </div>
  );
};

export default List;
