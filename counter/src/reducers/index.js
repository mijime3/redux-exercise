// action と現在の state を受け取り、**新しい** state を返す
// 受け取った state を変更してはいけない 
export default (state = 0, action = {}) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    // action が不明の場合は state をそのまま返す
    default:
      return state
  }
};
