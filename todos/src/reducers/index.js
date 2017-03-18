import { combineReducers } from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter';

// `combineReducers()` は複数の reducer を１つにまとめる
// state は 各 reducer 名をキーとしたツリー構造のデータとなる
// 以下の場合は次のような state になる
// state = {
//    "todos": [todo1, todo2, ...],
//    "visibilityFilter": "SHOW_ALL"
// }
// 各 reducer で扱う state は、自身の名前のキーに対する値の部分だけになる
const todoApp = combineReducers({
  todos,
  visibilityFilter
});

export default todoApp;
