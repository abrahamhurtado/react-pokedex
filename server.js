// eslint-disable no-console
import express from 'express';
import path from 'path';

import chalk from 'chalk';

// middlewares
import compression from 'compression';
import favicon from 'serve-favicon';

// custom middlewares
import reactRouter from './server/middleware/reactRouter';

const app = express();

const env = process.env.NODE_ENV || 'development';

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './server/views'));

app.use(compression());
app.use(favicon(path.resolve(__dirname, './assets/favicon.ico')));
app.use('/static', express.static(`${__dirname}/build`));

if (env === 'development') {
  const webpack = require('webpack');
  const config = require('./webpack.config.dev')();
  const compiler = webpack(config);

  const devMiddleware = (require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    hot: true,
    stats: {
      colors: true
    },
    historyApiFallback: true
  }));

  app.use(devMiddleware);

  app.use(require('webpack-hot-middleware')(compiler));
}

app.use(reactRouter());

let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(chalk.bold.green(`El servidor escucha en el puerto ${port}`));
  if (process.env.ENABLE_TUNEL) {
    require('ngrok').connect(port, (err, url) => {
      if (err) {
        console.log(chalk.red(`${err}`));
        throw err;
      }
      console.log(chalk.green(`La aplicación está servida en ${url}`));
    });
  }
});
