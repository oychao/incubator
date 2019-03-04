import Riact, { useState, useEffect } from 'riact';
import axios from 'axios';

import useLifeCycleChecker from '../hooks/useLifeCycleChecker';
import useInputModel from '../hooks/useInputModel';
import useReducer from '../hooks/useReducer';

import ThemedButton from './ThemedButton';

const List = function() {
  useLifeCycleChecker('List');
  const { model: valueModel, setValue } = useInputModel('');
  const [ inputRef ] = useState(Riact.createRef());

  const { state, dispatch } = useReducer(function(
    state = { list: [] },
    action
  ) {
    const newState = Object.assign({}, state);
    switch (action.type) {
    case 'ADD':
      if (Array.isArray(action.payload)) {
        newState.list = newState.list.concat(action.payload);
      } else {
        newState.list.push(action.payload);
      }
      break;
    case 'DELETE':
      newState.list.splice(newState.list.indexOf(action.payload), 1);
      break;
    default:;
    }
    return newState;
  });

  const { list } = state;

  useEffect(() => {
    axios.get('/api/todo').then(({ data }) => {
      dispatch({
        type: 'ADD',
        payload: data
      });
      axios.defaults.headers['x-csrf-token'] = document.cookie.split('=')[1];
    });
  }, []);
  return (
    <div>
      <input ref={inputRef} type="text" {...valueModel} />
      <ThemedButton
        onClick={async () => {
          const formData = new FormData();
          formData.append('item', valueModel.value);
          const { data: { payload } } = await axios.post('/api/todo', {
            item: valueModel.value
          });
          dispatch({ type: 'ADD', payload });
          setValue('');
          inputRef.current.focus();
        }}>add item</ThemedButton>
      <ol>
        {list.length === 0
          ? 'loading'
          : list.map(item => {
            return (
              <li key={item.key} onClick={async () => {
                const { data: { code } } = await axios.delete(`/api/todo?key=${item.key}`);
                dispatch({ type: 'DELETE', payload: item });
              }}>{item.value}</li>
            );
          })}
      </ol>
    </div>
  );
};

export default List;
