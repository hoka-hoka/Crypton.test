import React, { Component } from 'react';

// import Pagination from '../common/Pagination';
import ReactPaginate from 'react-paginate';
import Sprite from '../common/Sprite';
import Preloader from '../common/Preloader';
import Navigation from './Navigation';
import List from './List';
import Search from './Search';

import { viewMode, baseUrls, planets } from '../constants';

import '../scss/normalize.scss';
import './main.scss';

class Template extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: viewMode.load,
      cardList: [],
      cardFavorites: [],
      filtered: [],
    };
  }

  componentDidMount = () => {
    this.onPageChanged();
  };

  updateFavorites = (prevState) => {
    const { cardFavorites } = this.state;
    if (cardFavorites.length && prevState.cardFavorites != cardFavorites) {
      window.history.pushState({ cardFavorites: [...cardFavorites] }, '', '');
    }
  };

  updateTotalRecord = (prevState) => {
    const { view, cardFavorites, filtered } = this.state;
    if (prevState.view != view) {
      if (view === viewMode.main) {
        this.setState({ totalRecords: Math.floor(filtered.length / 10) || 9 });
      } else {
        this.setState({ totalRecords: Math.floor(cardFavorites.length / 10) });
      }
    }
  };

  componentDidUpdate = (_, prevState) => {
    this.updateFavorites(prevState);
    this.updateTotalRecord(prevState);
  };

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

  onPageChanged = (data = { selected: 0 }) => {
    const { selected } = data;
    this.setState({ view: viewMode.load });
    this.getData({
      data: {},
      baseUrl: baseUrls.apiURL,
      method: `?page=${selected + 1}`,
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
      });
      this.changeView();
    });
  };

  getCardList = () => {
    const { view, cardList, cardFavorites, filtered } = this.state;
    if (view === viewMode.main) {
      return filtered.length ? filtered : cardList;
    }
    return cardFavorites;
  };

  render() {
    const { view, totalRecords, cardList, cardFavorites } = this.state;
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
            <Navigation updateState={this.updateState} />
          </div>
          <div className="st-wars__wrap">
            <List
              list={this.getCardList()}
              cardFavorites={cardFavorites}
              updateState={this.updateState}
            />
            <Search
              cardList={cardList}
              getData={this.getData}
              updateState={this.updateState}
            />
            {/* <Filter /> */}
          </div>

          <div className="st-wars__pagination">
            <ReactPaginate
              pageCount={totalRecords}
              pageRangeDisplayed="10"
              marginPagesDisplayed="1"
              activeClassName="pagination__btn_active"
              previousClassName="pagination__btn_prev"
              nextClassName="pagination__btn_next"
              pageClassName="pagination__btn"
              pageLinkClassName="pagination__link"
              onPageChange={this.onPageChanged}
            />
          </div>
          <Sprite />
        </div>
      </div>
    );
  }
}

export default Template;
