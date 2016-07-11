var webpack = require('webpack');
var resolve = require('path').resolve;
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

var loaders = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: 'babel',
    query: {
      presets: [
        'es2015-webpack',
        'react'
      ],
      plugins: [
        'react-hot-loader/babel'
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
  }
]

var plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin({
    template: './index.html'
  }),
  new ScriptExtHtmlWebpackPlugin({
    async: ['loadCSS.js']
  }),
]

module.exports = () => {
  return {
    context: __dirname,
    entry: {
      'app': ['react-hot-loader/patch', 'webpack-hot-middleware/client', './client/main'],
      'loadCSS': './client/loadCss'
    },
    devtool: 'cheap-module-eval-source-map',
    output: {
      filename: '[name].js',
      path: resolve(__dirname, 'build'),
      publicPath: '/static/'
    },
    resolve: {
      extensions: ['.js', '.jsx', '.css', '.json']
    },
    module: {
      loaders: loaders
    },
    plugins: plugins,
    postcss: () => [ autoprefixer({browsers: 'last 2 versions'}) ]
  }
}
