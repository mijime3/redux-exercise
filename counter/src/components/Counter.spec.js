import React from 'react'
import { shallow } from 'enzyme'
import Counter from './Counter'

function setup(value = 0) {
  const actions = {
    // `jest.fn()` は mock function の生成
    onIncrement: jest.fn(),
    onDecrement: jest.fn()
  };
  // `shallow` は enzyme のメソッド
  // react のコンポーネントをレンダリングし、DOM検証のメソッドを持つオブジェクト(ShallowWrapper)を返す
  // shallow というだけあって浅いレンダリングになっており、深い階層のコンポーネントのイベントが発火しない、などの制約がある
  const component = shallow(
    // `...` は配列展開
    // この場合 `<Counter value={value} onIncrement=actions.onIncrement onDecrement=actions.onDecrement />` と同様
    <Counter value={value} {...actions} />
  );
  
  return {
    component: component,
    actions: actions,
    // ShallowWrapper は selector で走査できる
    buttons: component.find('button'),
    p: component.find('p')
  };
}

// `create-react-app` を使ってプロジェクトを作成すると、テストの仕組みは `react-scripts` によって提供される
// `react-scripts` では、テスティングフレームワークは `Jest` が使われている
// `Jest` は、内部的には `Jasmine` というテスティングフレームワークを採用している
// `describe()` `it()` `expect()` などは `Jasmine` の機能である

// `describe()` はテストのグルーピング
describe('Counter component', () => {
  // `it()` は1つのテスト
  it('should display count', () => {
    const { p } = setup();
    // DOMの中身を検証
    expect(p.text()).toMatch(/^Clicked: 0 times/)
  });
  
  it('first button should call onIncrement', () => {
    const { buttons, actions } = setup();
    // 最初のボタンのclickイベントを発火させる
    // `simulate()` は ShallowWrapper のメソッド＝enzymeの機能
    buttons.at(0).simulate('click');
    // actions は コンポーネントに注入したモック
    // `toBeCalled()` は function 呼び出しのアサーション
    expect(actions.onIncrement).toBeCalled();
  });

  it('second button should call onDecrement', () => {
    const { buttons, actions } = setup();
    buttons.at(1).simulate('click');
    expect(actions.onDecrement).toBeCalled();
  });

  it('third button should be not call onIncrement if the counter is even', () => {
    const { buttons, actions } = setup(42);
    buttons.at(2).simulate('click');
    expect(actions.onIncrement).not.toBeCalled()
  });

  it('third button should call onIncrement if the counter is odd', () => {
    const { buttons, actions } = setup(43);
    buttons.at(2).simulate('click');
    expect(actions.onIncrement).toBeCalled();
  });

  it('third button should call onIncrement if the counter is odd and negative', () => {
    const { buttons, actions } = setup(-43);
    buttons.at(2).simulate('click');
    expect(actions.onIncrement).toBeCalled();
  });

  // 非同期のテスト
  // 単純にsetTimeout()するだけでは、非同期呼び出しの function が実行される前にテストが終わってしまう
  // テストメソッドの引数で `done` callback を受け取ると `done()` の実行を待つようになる（呼び出されないとタイムアウトしてテストが失敗する）
  it('fourth button should call onIncrement in a second', (done) => {
    const { buttons, actions } = setup();
    buttons.at(3).simulate('click');
    setTimeout(() => {
      expect(actions.onIncrement).toBeCalled();
      done();
    }, 1000);
  });
});
