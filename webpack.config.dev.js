var webpack = require('webpack');
var resolve = require('path').resolve;
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
var AssetsPlugin = require('assets-webpack-plugin');

var loaders = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: 'babel',
    babelrc: false,
    query: {
      presets: [
        'es2015-webpack',
        'react'
      ]
    }
  }, {
    test: /\.css$/,
    loaders: [
      'style',
      {
        loader: 'css',
        query: {
          modules: true,
          importLoaders: '1',
          localIdentName: '[name]__[local]___[hash:base64:5]'
        }
      },
      'postcss'
    ]
  }, {
    test: /\.json$/,
    loader: 'json'
  }, {
    test: /\.(png|jpg)$/,
    loaders: [
      'url?name=[name].[ext]',
      'image-webpack'
    ]
  }
];

var plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin({
    template: './index.html'
  }),
  new ScriptExtHtmlWebpackPlugin({
    async: [ 'loadCSS.js' ]
  }),
  new AssetsPlugin({
    filename: 'assets.json',
    path: resolve(__dirname, 'server'),
    prettyPrint: true,
    update: true
  })
];

module.exports = () => {
  return {
    context: __dirname,
    entry: {
      'app': './client/main',
      'loadCSS': './client/loadCss'
    },
    devtool: 'cheap-module-eval-source-map',
    output: {
      filename: '[hash:8].[name].js',
      path: resolve(__dirname, 'build'),
      publicPath: '/static/'
    },
    resolve: {
      extensions: [ '.js', '.jsx', '.css', '.json' ]
    },
    module: {
      loaders
    },
    plugins,
    postcss: () => [ autoprefixer({ browsers: 'last 2 versions' }) ],
    imageWebpackLoader: {
      pngquant: {
        quality: '20-30',
        speed: 4
      }
    }
  };
};
