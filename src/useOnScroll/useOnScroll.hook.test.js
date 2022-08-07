import { act, renderHook } from '@testing-library/react';
import useOnScroll from './';

describe('useOnScroll', () => {
  test('renders without crashing', () => {
    const { result } = renderHook(() => useOnScroll());
    expect(result.error)
      .not
      .toBeDefined();
  });

  describe('when the element is scrolled', () => {
    test('it calls the handler', () => {
      const handler = jest.fn();
      renderHook(() => useOnScroll(handler));

      act(() => {
        window.dispatchEvent(new Event('scroll'));
      });

      expect(handler)
        .toHaveBeenCalled();
    });
  });

  describe('when used with custom element', () => {
    test('it calls the handler', () => {
      const handler = jest.fn();
      const container = document.createElement('div');
      renderHook(() => useOnScroll(handler, container));

      act(() => {
        container.dispatchEvent(new Event('scroll'));
      });

      expect(handler)
        .toHaveBeenCalled();
    });
  });
});
