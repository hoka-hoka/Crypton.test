import React, { useState, useEffect, useRef } from 'react';
import './Heart.scss';

const Heart = ({ forId, defaultActive, callback }) => {
  const [active, setActive] = useState(defaultActive || false);
  const bubbling = useRef(defaultActive || false);

  const favoriteHandler = () => {
    setActive((prevState) => !prevState);
    bubbling.current = !bubbling.current;
    callback(bubbling.current);
  };

  return (
    <div className="heart">
      <input
        id={forId}
        className="heart heart_hidden"
        type="checkbox"
        onClick={favoriteHandler}
      />
      <label
        className={`heart__lab${active ? ' heart__lab_active' : ''}`}
        htmlFor={forId}
      />
    </div>
  );
};

export default Heart;
