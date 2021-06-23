const lang = [
  'Главная',
  'Любимые герои',
  'Имя',
  'Планета',
  'Поиск',
  'Найти',
  'Фильтр',
];

const langData = {
  main: 0,
  favorites: 1,
  name: 2,
  homeworld: 3,
  search: 4,
  find: 5,
  filter: 6,
};

const baseUrls = {
  apiURL: 'https://swapi.dev/api/people/',
  imgsURL: 'https://starwars-visualguide.com/assets/img/characters/',
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
    ref: '/favorites',
    view: lang[langData.favorites],
  },
];

const filter = {
  gender: [
    {
      id: '1',
      action: true,
      idFor: 'male',
      labText: 'male',
      name: 'male',
    },
    {
      id: 2,
      idFor: 'female',
      labText: 'female',
      name: 'female',
    },
  ],
};

const planets = [
  'Tatooine',
  'Alderaan',
  'Yavin IV',
  'Hoth',
  'Dagobah',
  'Bespin',
  'Endor',
  'Naboo',
  'Coruscant',
  'Kamino',
  'Geonosis',
  'Utapau',
  'Mustafar',
  'Kashyyyk',
  'Polis Massa',
  'Mygeeto',
  'Felucia',
  'Cato Neimoidia',
  'Saleucami',
  'Stewjon',
  'Eriadu',
  'Corellia',
  'Rodia',
  'Nal Hutta',
  'Dantooine',
  'Bestine IV',
  'Ord Mantell',
  'unknown',
  'Trandosha',
  'Socorro',
  'Mon Cala',
  'Chandrila',
  'Sullust',
  'Toydaria',
  'Malastare',
  'Dathomir',
  'Ryloth',
  'Aleen Minor',
  'Vulpter',
  'Troiken',
  'Haruun Kal',
  'Cerea',
  'Glee Anselm',
  'Iridonia',
  'Tholoth',
  'Iktotch',
  'Quermia',
  'Dorin',
  'Champala',
  'Mirial',
  'Serenno',
  'Concord Dawn',
  'Zolan',
  'Ojom',
  'Skako',
  'Muunilinst',
  'Shili',
  'Kalee',
  'Umbara',
];

export { lang, langData, viewMode, navigation, planets, baseUrls, filter };
