// 'react'モジュールから `default export された値` を'React'という名前で読み込む
// ES6の機能
import React from 'react';
import ReactDOM from 'react-dom';
// 'redux'モジュールから `createStore という名前で export された値` を'createStore'という名前で読み込む
import { createStore } from 'redux';
import Counter from './components/Counter';
import counter from './reducers';

// JSはステートメント末尾にセミコロンがなくても動作する（ASIという機能で、自動的に補完される）
const store = createStore(counter)
const rootEl = document.getElementById('root');

// `() =>` は arrow function
// `()` には引数を記述する
// `=>` の後は関数の本体
const render = () => ReactDOM.render(
  <Counter
    value={store.getState()}
    onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
    onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
  />,
  rootEl
);

render();
store.subscribe(render);
