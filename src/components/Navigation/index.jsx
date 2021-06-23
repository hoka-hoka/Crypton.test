import React, { useEffect, useState } from 'react';
import { BrowserRouter, NavLink } from 'react-router-dom';
import { navigation, viewMode } from '../../constants';

import './Navigation.scss';

const Navigation = ({ view, updateState }) => {
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
