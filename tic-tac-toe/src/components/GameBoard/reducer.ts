import { IAction } from 'store/type';
import { IGameBoardReduxState } from './type';
import { TSquareStatus } from 'comps/Square/type';
import * as actions from './actions';

export default (state: IGameBoardReduxState = {
  curPlayer: 1,
  result: '',
  status: [0, 0, 0, 0, 0, 0, 0, 0, 0]
}, action: IAction) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case actions.MOVE:
      newState.status[action.payload] = newState.curPlayer;
      newState.curPlayer = newState.curPlayer === 1 ? 2 : 1;
      const winner = checkResult(newState.status);
      if (winner !== 0) {
        newState.result = winner === 1 ? 'O wins' : 'X wins';
      }
      return newState;
    case actions.RESTART:
      newState.curPlayer = 1;
      newState.result = '';
      newState.status = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      return newState;
    default:
      return state;
  }
};

const checkResult = (status: TSquareStatus[]): number => {
  const checkLine = (a: TSquareStatus, b: TSquareStatus, c: TSquareStatus): TSquareStatus => a === (a & b & c) ? a : 0;
  const checkCases = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  for (let i = 0; i < checkCases.length; i++) {
    const [a, b, c] = checkCases[i];
    const result = checkLine(status[a], status[b], status[c]);
    if (result !== 0) {
      return result;
    }
  }
  return 0;
}
