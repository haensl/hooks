import { act, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';
import useDebounce from './';

describe('useDebounce', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('renders without crashing', () => {
    const { result } = renderHook(() => useDebounce(jest.fn(), 200));
    expect(result.error)
      .not
      .toBeDefined();
  });

  describe('given non-function for first parameter', () => {
    let consoleMock;

    beforeEach(() => {
      consoleMock = jest.spyOn(console, 'error').mockImplementation(() => {
        // ignore
      });
    });

    afterEach(() => {
      consoleMock.mockRestore();
    });

    it('throws a TypeError', () => {
      let error;
      try {
        renderHook(() => useDebounce('foo', 200));
      } catch (err) {
        error = err;
      }
      expect(error)
        .toBeInstanceOf(TypeError);

      consoleMock.mockRestore();
    });
  });

  describe('given non-number for second parameter', () => {
    let consoleMock;

    beforeEach(() => {
      consoleMock = jest.spyOn(console, 'error').mockImplementation(() => {
        // ignore
      });
    });

    afterEach(() => {
      consoleMock.mockRestore();
    });

    it('throws a TypeError', () => {
      let error;
      try {
        renderHook(() => useDebounce(jest.fn(), {}));
      } catch (err) {
        error = err;
      }

      expect(error)
        .toBeInstanceOf(TypeError);
    });
  });

  describe('when a handler is debounced', () => {
    it('does is not called immediately', () => {
      const handler = jest.fn();
      let eventHandler;
      renderHook(() => {
        eventHandler = useDebounce(handler, 100);
      });

      act(() => {
        eventHandler();
      });

      expect(handler)
        .not
        .toHaveBeenCalled();
    });
  });

  describe('when two calls happen within debounceMs', () => {
    it('does not call the handler', () => {
      const handler = jest.fn();
      let eventHandler;
      renderHook(() => {
        eventHandler = useDebounce(handler, 100);
      });

      act(() => {
        eventHandler();

        jest.advanceTimersByTime(50);

        eventHandler();

        jest.advanceTimersByTime(50);
      });

      expect(handler)
        .not
        .toHaveBeenCalled();
    });
  });

  describe('when debounceMs have passed without another call', () => {
    it('calls the handler', () => {
      const handler = jest.fn();
      let eventHandler;
      renderHook(() => {
        eventHandler = useDebounce(handler, 100);
      });

      act(() => {
        eventHandler();

        jest.advanceTimersByTime(100);
      });

      expect(handler)
        .toHaveBeenCalled();
    });
  });
});
