import { act, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';

import useTimeout from './';

describe('useTimeout', () => {
  let callback;

  beforeAll(() => {
    jest.useFakeTimers();
    callback = jest.fn();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe('when rendering', () => {
    it('calls the callback once after the given milliseconds', () => {
      renderHook(() => useTimeout(callback, 100));

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
        .toEqual(1);
    });
  });
});
