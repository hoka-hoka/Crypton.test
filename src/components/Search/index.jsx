import React, { useState } from 'react';
import { lang, langData, baseUrls, planets } from '../../constants';
import './Search.scss';

const Search = ({ cardList, getData, updateState }) => {
  const [word, setWord] = useState('');

  const writeWord = (event) => {
    const { value } = event.target;
    setWord(value);
  };

  const prepareLinkToImage = (imgUrl) => {
    const image = imgUrl.match(/(?!=people\/)\d+(?=\/)/gi) || [];
    const imageIndex = image[0] || '';
    const rezult = {
      id: imageIndex,
      url: `${baseUrls.imgsURL}${imageIndex}.jpg`,
    };
    return rezult;
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

      const foundCard = Array.from(resp.results, (item, i) => {
        const home = item.homeworld.match(/(?!=planets\/)\d+(?=\/)/gi)[0];
        const homeworld = planets[home];
        const image = prepareLinkToImage(item.url);
        return {
          homeworld,
          id: image.id,
          image: image.url,
          name: item.name,
        };
      });

      updateState({ update: true })({
        filtered: [...foundCard],
        totalRecords: Math.floor(foundCard.length / 10),
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
