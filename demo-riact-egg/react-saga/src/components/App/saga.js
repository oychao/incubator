import { take, put, takeLatest, all, select } from 'redux-saga/effects';

import * as actionTypes from './actionTypes';

const sagaIncrement = function* () {
  yield takeLatest(actionTypes.INCREMENT_ASYNC, function* ({payload}) {
    yield put({ type: actionTypes.INCREMENT, payload });
    yield new Promise(res => setTimeout(res, 1e2));
    yield put({ type: actionTypes.INCREMENT, payload });
  });
};

const sagaLogger = function* () {
  while (true) {
    console.log(yield take(actionTypes.INCREMENT_ASYNC));
    console.log(yield select());
  }
};

const rootSaga = function* () {
  const allSagas = [
    sagaLogger(),
    sagaIncrement()
  ];
  yield all(allSagas);
};

export default rootSaga;
