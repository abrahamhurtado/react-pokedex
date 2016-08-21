import React from 'react';
import { render } from 'react-dom';
import AsyncProps from 'async-props';
import { Router, browserHistory, match } from 'react-router';
import routes from '../shared/routes';
const app = document.querySelector('#react-app');

match({ routes, history: browserHistory }, (err, redirect, props) => {
  render(
    <Router
      render={ (renderProps) => (
        <AsyncProps { ...renderProps } />
      ) }
      history={ browserHistory }
      routes={ routes }
    />
  , app);
});
