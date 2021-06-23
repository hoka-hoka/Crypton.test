import React, { useState } from 'react';
import { lang, langData, baseUrls } from '../../constants';
import './Search.scss';

const Search = ({ cardList, getData, updateState }) => {
  const [word, setWord] = useState('');

  const writeWord = (event) => {
    const { value } = event.target;
    setWord(value);
  };

  const findByWord = () => {
    getData({
      data: {},
      baseUrl: baseUrls.apiURL,
      method: `?search=${word}`,
    }).then((resp) => {
      if (!resp.results.length || !word) {
        updateState({ update: true })({ filtered: [], totalRecords: 9 });
        return;
      }

      const copyCardList = [...cardList];

      const foundCard = copyCardList.filter((card) =>
        resp.results.find((item) => item.name === card.name),
      );

      updateState({ update: true })({
        filtered: [...foundCard],
        totalRecords: foundCard.length / 10,
      });
    });
  };

  return (
    <div className="search">
      <div className="search__name">{lang[langData.search]}</div>
      <input
        className="search__field"
        type="text"
        onChange={writeWord}
        value={word || ''}
      />
      <button className="search__btn" type="button" onClick={findByWord}>
        {lang[langData.find]}
      </button>
    </div>
  );
};

export default Search;
