import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import GameBoard from 'comps/GameBoard';
import 'style/global';

ReactDOM.render(
  <Provider store={store}>
    <GameBoard.view />
  </Provider>
  , document.querySelector('#app')
);
