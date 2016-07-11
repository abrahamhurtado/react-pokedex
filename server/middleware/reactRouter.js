import React from 'react';
import Helmet from 'react-helmet';
import AsyncProps, { loadPropsOnServer } from 'async-props';
import { readFileSync } from 'fs';
import { renderToString } from 'react-dom/server';
import { match } from 'react-router';
import routes from '../../shared/routes';

export default (isDev, filename, webpackFileSystem) => (req, res) => {
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

        try {
          if (isDev) {
            res.send(
              webpackFileSystem
              .readFileSync(filename)
              .toString()
              .replace('{{TITLE}}', head.title.toString())
              .replace('{{APP}}', app)
              .replace('{{scriptTag}}', scriptTag)
            );
          } else {
            res.send(
              readFileSync(filename)
              .toString()
              .replace('{{TITLE}}', head.title.toString())
              .replace('{{APP}}', app)
              .replace('{{scriptTag}}', scriptTag)
            );
          }
        } catch (e) {
          res.send('An error has happened, maybe it is because the index.html has not been created.');
        }
      });
    } else {
      res.status(404).send('Not found');
    }
  });
};
