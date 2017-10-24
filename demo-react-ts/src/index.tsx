import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Profile from './components/Profile';
import Hello from './components/Hello';

ReactDOM.render(
  <div>
    <Hello msg='hello world' />
    <Profile username='my name is Ouyang' />
  </div>, document.querySelector('#app')
);
