import * as actionTypes from './actionTypes';

// redux-actions is highly recommended

export const addAsync = num => ({
  type: actionTypes.INCREMENT_ASYNC,
  payload: {
    num
  }
});

export const input = text => ({
  type: actionTypes.INPUT,
  payload: {
    text
  }
});
