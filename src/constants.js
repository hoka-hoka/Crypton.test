const lang = ['Главная', 'Любимые герои'];

const langData = {
  main: 0,
  favorites: 1,
};

const viewMode = {
  none: 'none',
  load: 'loading',
  main: lang[langData.main],
  favorites: lang[langData.favorites],
};

const navigation = [
  {
    id: 1,
    alias: lang[langData.main],
    name: 'Главная',
    ref: '/',
    view: lang[langData.main],
  },
  {
    id: 2,
    alias: lang[langData.favorites],
    name: 'Любимые герои',
    ref: '/home',
    view: lang[langData.favorites],
  },
];

export { lang, langData, viewMode, navigation };
