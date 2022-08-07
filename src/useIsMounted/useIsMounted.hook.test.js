import { act, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';
import useIsMounted from './';

describe('useIsMounted', () => {
  test('renders without crashing', () => {
    const { result } = renderHook(() => useIsMounted());
    expect(result.error)
      .not
      .toBeDefined();
  });

  describe('when the component is mounted', () => {
    test('returns true', () => {
      const { result } = renderHook(() => useIsMounted());

      expect(result.current())
        .toBe(true);
    });
  });

  describe('when the component is unmounted', () => {
    test('returns false', () => {
      const { result, unmount } = renderHook(() => useIsMounted());

      act(() => {
        unmount();
      });

      expect(result.current())
        .toBe(false);
    });
  });
});
