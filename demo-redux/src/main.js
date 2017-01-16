/**
 * Created by 欧阳 超 on 2017/01/13.
 */

import {
  store,
  unsubscribe,
} from './store';

import * as _ACTION from './action';

store.dispatch(_ACTION.addItem('Hello Redux.'));
store.dispatch(_ACTION.addItem('Hello Redux2.'));
store.dispatch(_ACTION.addItem('Hello Redux3.'));

store.dispatch(_ACTION.removeItem(1));

unsubscribe();