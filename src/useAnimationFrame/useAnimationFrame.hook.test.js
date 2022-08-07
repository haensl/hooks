import { act, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';

import useAnimationFrame from './';

describe.skip('useAnimationFrame', () => {
  let hasAnimated;
  let requestAnimationFrameSpy;

  beforeAll(() => {
    jest.useFakeTimers();
    hasAnimated = false;
    requestAnimationFrameSpy = jest.spyOn(
      window,
      'requestAnimationFrame'
    ).mockImplementation((callback) => {
      if (!hasAnimated) {
        setTimeout(callback(Date.now() + 10));
        hasAnimated = true;
      }
    });
  });

  afterAll(() => {
    jest.useRealTimers();
    requestAnimationFrameSpy.mockRestore();
  });

  beforeEach(() => {
    hasAnimated = false;
  });

  describe('when animating', () => {
    it('applies the animation', () => {
      const handler = jest.fn();
      renderHook(() => useAnimationFrame(handler));

      act(() => {
        jest.runOnlyPendingTimers();
      });

      expect(handler).toHaveBeenCalled();
    });
  });
});

