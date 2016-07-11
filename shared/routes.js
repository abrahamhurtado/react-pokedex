import React from 'react';
import App from './components/App';
import PokemonList from './components/PokemonList';

import './global.css';

export default {
  path: '/',
  component: App,
  indexRoute: {
    component: PokemonList
  }
};
