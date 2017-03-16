import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App';
import reducer from './reducers';

const store = createStore(reducer);

render(
  // `Provider` は、子の Component と Store を紐付けるための存在
  // react-redux の `connect()()` を使って Container 化された Component と Store が紐付く
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);