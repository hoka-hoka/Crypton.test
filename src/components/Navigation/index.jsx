import React, { useState } from 'react';
import { BrowserRouter, NavLink } from 'react-router-dom';
import { navigation } from '../../constants';

import './Navigation.scss';

const Navigation = ({ view, updateState }) => {
  const [state, setState] = useState();

  return (
    <nav className="nav">
      <BrowserRouter>
        {navigation.map((item) => (
          <NavLink
            key={item.id}
            to={item.ref}
            className="nav__link"
            activeClassName="nav__link_active"
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
