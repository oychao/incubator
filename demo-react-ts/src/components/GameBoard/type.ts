import * as SquareTypes from 'comps/Square/type';

export type TGameBoardResult = '' | 'X wins' | 'O wins';
export type TPlayer = 1 | 2;

export interface IGameBoardStateToProps {
  result: TGameBoardResult,
  status: SquareTypes.TSquareStatus[],
}
export interface IGameBoardDispatchToProps {
  handleMove: (index: number) => void,
  handleRestart: () => void
}
export interface IGameBoardProps extends IGameBoardStateToProps, IGameBoardDispatchToProps { }
export interface IGameBoardReduxState extends Partial<IGameBoardStateToProps> {
  curPlayer: TPlayer
}
