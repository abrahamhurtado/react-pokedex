var webpack = require('webpack');
var resolve = require('path').resolve;
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
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
      ]
    }
  }, {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss')
  }, {
    test: /\.html$/,
    loader: 'html'
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
]

var plugins = [
  new HtmlWebpackPlugin({
    template: './index.html'
  }),
  new ScriptExtHtmlWebpackPlugin({
    async: ['loadCSS.js']
  }),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    output: {
      comments: false
    },
    sourceMap: false
  }),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new ExtractTextPlugin('style.css', { allChunks: true })
]

module.exports = () => {
  return {
    context: __dirname,
    entry: {
      'app': './client/main',
      'loadCSS': './client/loadCss',
      vendor: ['react', 'react-dom', 'react-router', 'async-props', 'react-helmet']
    },
    devtool: 'hidden-source-map',
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
    postcss: [ autoprefixer({browsers: 'last 2 versions'}) ],
    imageWebpackLoader: {
      pngquant: {
        quality: "20-30",
        speed: 4
      }
    }
  }
}
