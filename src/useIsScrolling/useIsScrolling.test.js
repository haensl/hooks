import { act, renderHook } from '@testing-library/react-hooks';
import '@testing-library/jest-dom';
import useIsScrolling from './';

describe('useIsScrolling', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('renders without crashing', () => {
    const { result } = renderHook(() => useIsScrolling());
    expect(result.error)
      .not
      .toBeDefined();
  });

  describe('when the window is not scrolled', () => {
    test('indicates that the window is not being scrolled', () => {
      const { result } = renderHook(() => useIsScrolling());

      expect(result.current)
        .toBe(false);
    });
  });

  describe('when the window is scrolled', () => {
    test('indicates that the window is being scrolled', () => {
      const { result } = renderHook(() => useIsScrolling());

      act(() => {
        window.scrollY = 50;
        window.dispatchEvent(new Event('scroll'));
      });

      expect(result.current)
        .toBe(true);
    });
  });

  describe('after the user has finished scrolling', () => {
    test('it indiates that the window has stopped scrolling', () => {
      const { result } = renderHook(() => useIsScrolling());

      act(() => {
        window.scrollY = 50;
        window.dispatchEvent(new Event('scroll'));

        jest.advanceTimersByTime(100);
      });

      expect(result.current)
        .toBe(false);
    });
  });
});
