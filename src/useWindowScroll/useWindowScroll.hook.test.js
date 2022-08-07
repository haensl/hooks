import { act, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';
import useWindowScroll from './';

describe('useWindowScroll', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  test('renders without crashing', () => {
    const { result } = renderHook(() => useWindowScroll());
    expect(result.error)
      .not
      .toBeDefined();
  });

  describe('when the window is scrolled', () => {
    it('updates the scroll position', () => {
      const { result } = renderHook(() => useWindowScroll());

      act(() => {
        window.scrollX = 10;
        window.scrollY = 50;
        window.dispatchEvent(new Event('scroll'));
        jest.runOnlyPendingTimers();
      });

      expect(result.current).toEqual(
        expect.objectContaining({
          x: 10,
          y: 50
        })
      );
    });
  });
});
