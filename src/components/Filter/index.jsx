import React, { useState } from 'react';
import { lang, langData, filter } from '../../constants';
import CheckBox from '../../common/CheckBox';

const Filter = ({ list, updateState }) => {
  const [bubbling, setBubbling] = useState();

  const filterOut = (active) => {
    const copyList = [...list];
  };

  const Bubbling = () => {
    setBubbling((prevState) => !prevState);
  };

  return (
    <div className="filter">
      <div className="filter__name">{lang[langData.filter]}</div>
      {filter.gender.map((gender) => (
        <div className="filter__item" key={gender.id}>
          <CheckBox
            action={gender.action}
            labText={gender.labText}
            idFor={gender.idFor}
            bubbling={bubbling}
            callback={(active) => filterOut(active)}
          />
        </div>
      ))}
      <button type="button" onClick={Bubbling}>
        Отфильтровать
      </button>
    </div>
  );
};

export default Filter;
