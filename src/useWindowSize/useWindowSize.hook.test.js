import { act, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';
import useWindowSize from './';

describe('useWindowSize', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('renders without crashing', () => {
    const { result } = renderHook(() => useWindowSize());
    expect(result.error)
      .not
      .toBeDefined();
  });

  describe('when the window is resized', () => {
    it('propagates the window size', () => {
      const { result } = renderHook(() => useWindowSize());

      act(() => {
        window.innerHeight = 200;
        window.innerWidth = 150;
        window.dispatchEvent(new Event('resize'));
        jest.runOnlyPendingTimers();
      });

      expect(result.current.width)
        .toEqual(150);
      expect(result.current.height)
        .toEqual(200);
    });
  });
});
