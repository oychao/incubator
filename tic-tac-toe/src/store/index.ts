import { createStore } from 'redux';
import GameBoard from 'comps/GameBoard';

const store = createStore(GameBoard.reducer);

export default store;
