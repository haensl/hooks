import { act, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';

import useInterval from './';

describe('useInterval', () => {
  let callback;

  beforeAll(() => {
    jest.useFakeTimers();
    callback = jest.fn();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe('when rendering', () => {
    it('calls the callback repeatedly', () => {
      renderHook(() => useInterval(callback, 100));

      expect(callback)
        .not
        .toHaveBeenCalled();

      act(() => {
        jest.advanceTimersByTime(101);
      });

      expect(callback)
        .toHaveBeenCalled();

      act(() => {
        jest.advanceTimersByTime(101);
      });

      expect(callback.mock.calls.length)
        .toEqual(2);
    });
  });
});
