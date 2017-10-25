import * as React from 'react';

import './style';

import Square from '../../components/Square';

export interface GameBoardProps {
  result: '' | 'X wins' | 'O wins',
  status: string[]
}

class GameBoard extends React.Component<GameBoardProps, {}> {
  render() {
    return (
      <div className="game-board">
        <Square.view status='X' />
      </div>
    );
  }
}

export default GameBoard;