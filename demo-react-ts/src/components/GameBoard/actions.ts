import { IAction } from 'store/type';
import { TPlayer } from 'comps/GameBoard/type';

export const MOVE = 'MOVE';
export const RESTART = 'RESTART';

export const move = (index: number): IAction => ({
  type: MOVE,
  payload: index
});

export const restart = (): IAction => ({
  type: RESTART
});