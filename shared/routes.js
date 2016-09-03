import React from 'react';
import App from './components/App';
import PokemonList from './components/PokemonList';

import './global.css';

export default {
  path: '/',
  component: App,
  indexRoute: {
    component: PokemonList
  },
  childRoutes: [
    {
      path: 'pokemon/:id',
      getComponent (nextState, cb) {
        System.import('./components/PokemonFullCard/index.js')
          .then((module) => cb(null, module.default))
          .catch((err) => cb(err, null))
      }
    }
  ]
};
