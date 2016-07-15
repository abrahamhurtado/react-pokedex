import React from 'react';
import Helmet from 'react-helmet';
import AsyncProps, { loadPropsOnServer } from 'async-props';
import { renderToString } from 'react-dom/server';
import { match } from 'react-router';
import routes from '../../shared/routes';

export default () => (req, res) => {
  match({ routes, location: req.url }, (err, redirect, props) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirect) {
      res.redirect(redirect.pathname + redirect.search);
    } else if (props) {
      loadPropsOnServer(props, null, (asyncError, asyncProps, scriptTag) => {
        const app = renderToString(
          <AsyncProps
            { ...props }
            { ...asyncProps }
          />
        );
        const head = Helmet.rewind();

        res.render('index', {
          app,
          scriptTag,
          title: head.title.toString()
        });
      });
    } else {
      res.status(404).send('Not found');
    }
  });
};
