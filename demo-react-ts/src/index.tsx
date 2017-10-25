import * as React from 'react';
import * as ReactDOM from 'react-dom';
import GameBoard from 'comps/GameBoard';
import 'style/global';

ReactDOM.render(
  <div>
    <GameBoard.view />
  </div>, document.querySelector('#app')
);
