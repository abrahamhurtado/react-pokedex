import { loadCSS } from 'fg-loadcss';
import FontFaceObserver from 'fontfaceobserver';

let OpenSans = new FontFaceObserver('Open Sans', {});

OpenSans
  .load()
  .then(() => {
    document.body.classList.add('fontsLoaded');
  })
  .catch((error) => {
    document.body.classList.remove('fontsLoaded');
  });

loadCSS('/static/pokemonSprites.css');
