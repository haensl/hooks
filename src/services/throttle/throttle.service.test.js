import { debounce } from './';

describe('throttle support', () => {
  let fn;
  let debounced;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    fn = jest.fn();
    debounced = debounce(fn, 100);
  });

  describe('when called twice within one interval', () => {
    beforeEach(() => {
      debounced();
      debounced();
    });

    it('does not execute before the interval passes', () => {
      expect(fn.mock.calls.length).toBe(0);
    });

    describe('when the intervall has passed', () => {
      beforeEach(() => {
        jest.runOnlyPendingTimers();
      });

      it('executes only once', () => {
        expect(fn.mock.calls.length).toBe(1);
      });
    });
  });
});

