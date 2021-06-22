import React, { Component } from 'react';

import Pagination from '../common/Pagination';
import Sprite from '../common/Sprite';
import Navigation from './Navigation';
import List from './List';

import { lang, langData, viewMode } from '../constants';

import '../scss/normalize.scss';
import './main.scss';

class Template extends Component {
  constructor(props) {
    super(props);
    this.state = { view: viewMode.main };
  }

  componentDidMount = () => {
    this.getData().then((resp) => {
      console.log(resp);
    });
  };

  getData = async (method = '', data = false) => {
    const resp = await fetch(
      `https://swapi.dev/api/people/${method}`,
      data
        ? {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(data),
          }
        : {},
    );
    if (!resp?.ok) {
      this.setState({ view: viewMode.error });
      throw new Error(
        `ответ по запросу https://swapi.dev/api/people/${method} имеет статус ${resp.status}`,
      );
    }
    return resp.json();
  };

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
        <div className="st-wars__nav">
          <Navigation view={view} updateState={this.updateState} />
        </div>
        <div className="st-wars__list">
          <List />
        </div>
        <div className="">
          <Pagination
            totalRecords={100}
            pageLimit={10}
            pageNeighbours={1}
            // onPageChanged={this.onPageChanged}
          />
        </div>
        <Sprite />
      </div>
    );
  }
}

export default Template;
