import * as types from './type';
import { TSquareStatus } from 'comps/Square/type';
import * as React from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import Square from 'comps/Square';
import InfoBoard from 'comps/InfoBoard';
import './style';

class GameBoard extends React.Component<types.IGameBoardProps, {}> {
  public static defaultProps: Partial<types.IGameBoardProps> = {
    result: ''
  }
  constructor(props: types.IGameBoardProps) {
    super(props);
  }
  render(): JSX.Element {
    return (
      <div>
        <div className="game-board">
          {this.props.status.map((ele, idx) => <Square.view key={idx} id={idx} status={ele} handleMove={this.props.handleMove} />)}
        </div>
        <div>
          <InfoBoard.view result={this.props.result} handleRestart={this.props.handleRestart} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: types.IGameBoardStateToProps, props: object): types.IGameBoardStateToProps => state;

const mapStateToDispatch = (dispatch: any, props: object): types.IGameBoardDispatchToProps => ({
  handleMove(index: number) {
    dispatch(actions.move(index));
  },
  handleRestart: () => dispatch(actions.restart())
});

export default connect(mapStateToProps, mapStateToDispatch)(GameBoard);
