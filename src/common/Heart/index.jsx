import React, { useRef } from 'react';
import './Heart.scss';

const Heart = ({ forId, callback }) => {
  const active = useRef(false);

  const favoriteHandler = () => {
    active.current = !active.current;
    callback(active.current);
  };

  return (
    <div className="heart">
      <input
        id={forId}
        className="heart heart_hidden"
        type="checkbox"
        onClick={favoriteHandler}
      />
      <label className="heart__lab" htmlFor={forId} />
    </div>
  );
};

export default Heart;
