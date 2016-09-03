require('babel-register')({
  presets: [ 'react' ],
  plugins: [
    'transform-es2015-modules-commonjs',
    [ 'system-import-transformer', { modules: 'common' } ]
  ]
});
require('css-modules-require-hook')({
  generateScopedName: '[name]__[local]___[hash:base64:5]'
});
require('./server');
