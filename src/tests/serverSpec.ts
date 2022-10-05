import { add } from '../server';

describe('testing if jasmine works', () => {
  it('add function testing --passing', () => {
    expect(add(2, 3)).toBe(5);
  });
  it('add function testing --failling', () => {
    expect(add(2, 3)).toBe(6);
  });
});
