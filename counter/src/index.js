// 'react'モジュールから `default export された値` を'React'という名前で読み込む
// ES6の機能
import React from 'react';
import ReactDOM from 'react-dom';
// 'redux'モジュールから `createStore という名前で export された値` を'createStore'という名前で読み込む
import { createStore } from 'redux';
// プロジェクト固有のモジュールも読み込める、ここでは相対パスでファイルパス（拡張子は不要）を指定している
import Counter from './components/Counter';
// ディレクトリパスだけを指定した場合は index.js が読み込まれる
import counter from './reducers';

// * JSはステートメント末尾にセミコロンがなくても動作する（ASIという機能で、自動的に補完される）
// reducer(ここでは counter = ./reducers/index.js で default export された function)を指定して、reduxのstoreを作成
const store = createStore(counter)
const rootEl = document.getElementById('root');

// * `() =>` は arrow function  `()` には引数を記述する   `=>` の後は関数の本体
// `ReactDOM.render()` には、JSXとcontainer(DOM node)を渡す
const render = () => ReactDOM.render(
  <Counter
    // JSXでは `{}` で囲まれた部分は JS として処理される
    // component の props.value に store の state をセット（このサンプルでは state は単一の数値）
    value={store.getState()}
    // component の props.onIncrement に 'INCREMENT' action を store に dispatch する function をセット
    // dispatch された action は reducer に渡される
    onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
    onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
  />,
  rootEl
);

render();
store.subscribe(render);
