import React, { Component } from 'react';

import Pagination from '../common/Pagination';
import Sprite from '../common/Sprite';
import Navigation from './Navigation';
import List from './List';

import { lang, langData, viewMode, planets } from '../constants';

import '../scss/normalize.scss';
import './main.scss';

class Template extends Component {
  constructor(props) {
    super(props);
    this.state = { view: viewMode.main, cardList: [] };
  }

  onPageChanged = (data = { currentPage: '1' }) => {
    const { currentPage } = data;
    this.getData(`?page=${currentPage}`).then((resp) => {
      if (!resp?.results) {
        return;
      }
      const peoples = Array.from(resp.results, (item, i) => {
        const home = item.homeworld.match(/(?!=planets\/)\d+(?=\/)/gi) || [];
        const homeIndex = home[0] || null;
        return { id: i + 1, name: item.name, homeworld: planets[homeIndex] };
      });
      this.setState({ cardList: [...peoples], currentPage: currentPage });
    });
  };

  componentDidMount = () => {
    this.onPageChanged();
    this.getData().then((resp) => {
      // console.log(resp);
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
    const { view, cardList } = this.state;
    return (
      <div className="st-wars">
        <div className="st-wars__nav">
          <Navigation view={view} updateState={this.updateState} />
        </div>
        <div className="st-wars__list">
          <List cardList={cardList} />
        </div>
        <div className="">
          <Pagination
            totalRecords={100}
            pageLimit={10}
            pageNeighbours={1}
            onPageChanged={this.onPageChanged}
          />
        </div>
        <Sprite />
      </div>
    );
  }
}

export default Template;
