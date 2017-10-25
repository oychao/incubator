import { TGameBoardResult, IGameBoardProps, IGameBoardContainerProps } from './type';
import { TSquareStatus } from 'comps/Square/type';
import * as React from 'react';
import Square from 'comps/Square';
import InfoBoard from 'comps/InfoBoard';
import './style';

class GameBoard extends React.Component<IGameBoardProps, {}> {
  public static defaultProps: Partial<IGameBoardProps> = {
    result: ''
  }
  constructor(props: any) {
    super();
  }
  render(): JSX.Element {
    return (
      <div>
        <div className="game-board">
          {this.props.status.map((ele, idx) => <Square.view key={idx} id={idx} status={ele} handleClick={this.props.handleClick} />)}
        </div>
        <div>
          <InfoBoard.view result={this.props.result} />
        </div>
      </div>
    );
  }
}

class GameBoardContainer extends React.Component<{}, IGameBoardContainerProps> {
  constructor(props: void) {
    super();
    this.state = {
      curPlayer: 1,
      result: '',
      status: [0, 0, 0, 0, 0, 0, 0, 0, 0]
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(id: number): void {
    if (this.state.result !== '') {
      return;
    }
    let { status, curPlayer } = this.state;
    status = status.slice();
    status[id] = curPlayer;
    curPlayer = curPlayer === 1 ? 2 : 1;
    this.setState({
      status,
      curPlayer
    });
  }
  checkResult(): number {
    const checkLine = (a: TSquareStatus, b: TSquareStatus, c: TSquareStatus): TSquareStatus => a === (a & b & c) ? a : 0;
    const checkCases = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    const { status } = this.state;
    for (let i = 0; i < checkCases.length; i++) {
      const [a, b, c] = checkCases[i];
      const result = checkLine(status[a], status[b], status[c]);
      if (result !== 0) {
        return result;
      }
    }
    return 0;
  }
  render() {
    return <GameBoard result={this.state.result} status={this.state.status} handleClick={this.handleClick} />
  }
  componentDidUpdate() {
    const winner = this.checkResult();
    if (winner === 0 || this.state.result !== '') {
      return;
    }
    const result: TGameBoardResult = winner === 1 ? 'O wins' : 'X wins';
    this.setState({
      result
    });
  }
}

export default GameBoardContainer;
