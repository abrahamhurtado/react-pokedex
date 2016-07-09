import React from 'react';
import App from './components/App';
import Index from './components/random/indexRouteComponent';
import Children from './components/random/childrenRouteComponent';
import PokemonList from './components/PokemonList';

import './global.css';

export default {
  path: '/',
  component: PokemonList,
  indexRoute: {
    component: Index
  },
  childRoutes: [
    { path: '/children', component: Children }
  ]
};
