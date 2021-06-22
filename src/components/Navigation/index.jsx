import React, { useState } from 'react';
import { BrowserRouter, NavLink } from 'react-router-dom';
import { lang, langData, viewMode, navigation } from '../../constants';

import './Navigation.scss';

const Navigation = ({ view, withRouter, updateState }) => {
  const [state, setState] = useState();

  const changeView = (newView) => {
    console.log();
  };

  const FancyLink = (ref, name) => (
    <a className="nav__link" href={ref} onClick={changeView}>
      {name}
    </a>
  );

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
