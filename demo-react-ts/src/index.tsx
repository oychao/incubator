import * as React from 'react';
import * as ReactDOM from 'react-dom';

import GameBoard from 'comps/GameBoard';

ReactDOM.render(
  <div>
    <GameBoard.view result='X wins' status={[]} />
  </div>, document.querySelector('#app')
);
