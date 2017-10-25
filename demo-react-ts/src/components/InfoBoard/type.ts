import { TGameBoardResult } from 'comps/GameBoard/type';

export interface IInfoBoardProps {
  result: TGameBoardResult,
  resetStatus: () => void
}
