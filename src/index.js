import React from 'react';
import {render} from 'react-dom';

boot();

function boot () {
    let App = require('./App').default;
    render(<App />, document.getElementById('app'));
}

if (process.env.NODE_ENV !== 'production') {
  if (module.hot) {
      // Enable Webpack hot module replacement for pure
    module.hot.accept('./App', () => {
      boot();
    });
  }
}
