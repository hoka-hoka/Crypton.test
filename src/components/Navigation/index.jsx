import React, { useEffect } from 'react';
import { BrowserRouter, NavLink, useHistory } from 'react-router-dom';
import { navigation } from '../../constants';

import './Navigation.scss';

const Navigation = ({ view, updateState, cardFavorites }) => {
  const changeView = (index) => {
    updateState({ update: true })({ view: navigation[index].view });
  };

  return (
    <nav className="nav">
      <BrowserRouter>
        {navigation.map((item, index) => (
          <NavLink
            key={item.id}
            to={item.ref}
            className="nav__link"
            activeClassName="nav__link_active"
            onClick={() => changeView(index)}
            exact
            replace
          >
            {item.name}
          </NavLink>
        ))}
      </BrowserRouter>
    </nav>
  );
};

Navigation.defaultProps = {
  view: '',
};

export default Navigation;
