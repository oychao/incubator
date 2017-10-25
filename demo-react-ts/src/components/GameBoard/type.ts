import * as SquareTypes from 'comps/Square/type';

export type TGameBoardResult = '' | 'X wins' | 'O wins';
export interface IGameBoardProps {
  result: TGameBoardResult,
  status: SquareTypes.TSquareStatus[],
  handleClick: (id: number) => void,
  resetStatus: () => void
}
export interface IGameBoardContainerProps extends Partial<IGameBoardProps> {
  curPlayer: 1 | 2
}
