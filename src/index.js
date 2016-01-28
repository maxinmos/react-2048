import React from 'react';
import { render } from 'react-dom';

boot();

function boot () {
    let { Pure } = require('./pure')
    render(<Pure />, document.getElementById('app'));
}

if (module.hot) {
    // Enable Webpack hot module replacement for pure
  module.hot.accept('./pure', () => {
    boot();
  });
}
