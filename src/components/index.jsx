import React, { Component } from 'react';

import Pagination from '../common/Pagination';
import Sprite from '../common/Sprite';
import Preloader from '../common/Preloader';
import Navigation from './Navigation';
import List from './List';

import { lang, langData, viewMode, planets, baseUrls } from '../constants';

import '../scss/normalize.scss';
import './main.scss';
class Template extends Component {
  constructor(props) {
    super(props);
    this.state = { view: viewMode.load, cardList: [], cardFavorites: [] };
  }

  getData = async ({ baseUrl = baseUrls.apiURL, method = '', data = {} }) => {
    const resp = await fetch(`${baseUrl}${method}`, data);
    if (!resp?.ok) {
      this.setState({ view: viewMode.error });
      throw new Error(
        `ответ по запросу ${baseUrl}${method} имеет статус ${resp.status}`,
      );
    }
    return resp.json();
  };

  updateState = ({ update } = {}) => {
    if (!update) {
      return this.state;
    }
    return (params) => this.setState(params);
  };

  prepareLinkToImage = (imgUrl) => {
    const image = imgUrl.match(/(?!=people\/)\d+(?=\/)/gi) || [];
    const imageIndex = image[0] || '';
    const rezult = {
      id: imageIndex,
      url: `${baseUrls.imgsURL}${imageIndex}.jpg`,
    };
    return rezult;
  };

  changeView = () => {
    const isFavoritesView = document.location.pathname.search('favorites');
    if (~isFavoritesView) {
      this.setState({ view: viewMode.favorites });
    } else {
      this.setState({ view: viewMode.main });
    }
  };

  onPageChanged = (data = { currentPage: '1' }) => {
    const { currentPage } = data;
    this.setState({ view: viewMode.load });
    this.getData({
      data: {},
      baseUrl: baseUrls.apiURL,
      method: `?page=${currentPage}`,
    }).then((resp) => {
      if (!resp?.results) {
        return;
      }
      const peoples = Array.from(resp.results, (item, i) => {
        const home = item.homeworld.match(/(?!=planets\/)\d+(?=\/)/gi)[0];
        const homeworld = planets[home];
        const image = this.prepareLinkToImage(item.url);

        return {
          homeworld,
          id: image.id,
          image: image.url,
          name: item.name,
        };
      });
      this.setState({
        cardList: [...peoples],
        currentPage: currentPage,
      });
      this.changeView();
    });
  };

  render() {
    const { view, cardList, cardFavorites } = this.state;
    if (view === viewMode.error) {
      return false;
    }
    return (
      <div className="st-wars">
        {view === viewMode.load && <Preloader />}
        <div
          className={`st-wars__cont${
            view === viewMode.load ? ' st-wars_hidden' : ''
          }`}
        >
          <div className="st-wars__nav">
            <Navigation view={view} updateState={this.updateState} />
          </div>
          <div className="st-wars__list">
            <List
              cardList={view === viewMode.main ? cardList : cardFavorites}
              cardFavorites={cardFavorites}
              updateState={this.updateState}
            />
          </div>
          <div className="">
            <Pagination
              totalRecords={view === viewMode.main ? 90 : cardFavorites.length}
              pageLimit={10}
              pageNeighbours={1}
              onPageChanged={this.onPageChanged}
            />
          </div>
          <Sprite />
        </div>
      </div>
    );
  }
}

export default Template;
