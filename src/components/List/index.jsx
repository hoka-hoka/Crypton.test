import React, { useState } from 'react';
import { lang, langData } from '../../constants';
import Card from '../Card';
import './List.scss';

const List = ({ cardList }) => {
  const [state, setState] = useState();
  return (
    <div className="list">
      {cardList.map((card) => (
        <div className="list__item" key={card.id}>
          <Card card={card} />
        </div>
      ))}
    </div>
  );
};

export default List;
