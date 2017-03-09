import counter from './index'

// reducerのテスト
// reducer は state と action を渡すと新しい state を返す純粋な function なので、テストはシンプル
describe('reducers', () => {
  it('should provide the initial state', () => {
    expect(counter(undefined, {})).toBe(0);
  });

  it('should handle INCREMENT action', () => {
    expect(counter(1, { type: 'INCREMENT' })).toBe(2);
  });

  it('should handle DECREMENT action', () => {
    expect(counter(1, { type: 'DECREMENT' })).toBe(0);
  });

  it('should ignore unknown action', () => {
    expect(counter(1, { type: 'unknown' })).toBe(1);
  });
});
