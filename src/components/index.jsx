import React, { Component } from 'react';

import Favorites from './Favorites';
import Navigation from './Navigation';
import Card from './Card';

import { lang, langData, viewMode, navigation } from '../constants';

import '../scss/normalize.scss';
import './main.scss';
import { map } from 'jquery';

class Template extends Component {
  constructor(props) {
    super(props);
    this.state = { view: viewMode.main };
  }

  // componentDidMount = () => {
  //   console.log(window.history);
  // };

  // componentDidUpdate = (_, prevState) => {
  //   const { view } = this.state;
  //   if (prevState.view !== view) {
  //     this.changeView();
  //   }
  // };

  changeView = () => {
    const { history } = window;
    this.setState({ view: history.state.view });
  };

  updateState = ({ update } = {}) => {
    if (!update) {
      return this.state;
    }
    return (params) => this.setState(params);
  };

  render() {
    const { view } = this.state;
    return (
      <div className="st-wars">
        <Navigation view={view} updateState={this.updateState} />
      </div>
    );
  }
}

export default Template;
