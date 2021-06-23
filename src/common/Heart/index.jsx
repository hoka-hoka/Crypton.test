import React, { useEffect, useState } from 'react';
import './Heart.scss';

const Heart = ({ forId, callback }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    callback(active);
  }, [active]);

  const favoriteHandler = () => {
    setActive((prevState) => !prevState);
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
