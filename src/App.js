import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers/index.js';
import Game from './components/Game.js';
import {createGrid} from './reducers/grid.js'

let store = createStore(reducers);

export default () => (
  <Provider store={store}>
    <Game/>
  </Provider>
  )
