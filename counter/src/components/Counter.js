import React, { Component, PropTypes } from 'react';

// `class` はES6で導入された糖衣構文　JSはあくまで prototype ベース
class Counter extends Component {

  // prop のバリデーション
  // エラーがある場合は、コンソールにwarningとして出力される
  // ただし、productionモードではチェックチェックされない（？）
  static propTypes = {
    value: PropTypes.number.isRequired,
    onIncrement: PropTypes.func.isRequired,
    onDecrement: PropTypes.func.isRequired
  };

  incrementIfOdd = () => {
    if (this.props.value % 2 !== 0) {
        this.props.onIncrement()
    }
  };

  incrementAsync = () => {
    setTimeout(this.props.onIncrement, 1000)
  };
  
  render() {
    const { value, onIncrement, onDecrement } = this.props;
    return (
      <p>
        Clicked: {value} times
        {' '}
        <button onClick={onIncrement}>
          +
        </button>
        {' '}
        <button onClick={onDecrement}>
          -
        </button>
        {' '}
        <button onClick={this.incrementIfOdd}>
          Increment if odd
        </button>
        {' '}
        <button onClick={this.incrementAsync}>
          Increment async
        </button>
      </p>
    )
  }
}

// `import XXX from 'Counter.js'` としたとき、XXX に Counter が入る
export default Counter;
