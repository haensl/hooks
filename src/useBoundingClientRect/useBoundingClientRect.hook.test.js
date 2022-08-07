import { act, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';

import useBoundingClientRect from './';

let currentResizeObserver;

class ResizeObserver {
  constructor(callback) {
    this.targets = [];
    this.callback = callback;
    this.observe = jest.fn()
      .mockImplementation(function(target) {
        this.targets.push(target);
      }).bind(this);

    this.unobserve = jest.fn()
      .mockImplementation(function(target) {
        this.targets = this.targets.filter((t) => t !== target);
      }).bind(this);

    this.trigger = jest.fn()
      .mockImplementation(function() {
        for (const target of this.targets) {
          this.callback({ target });
        }
      }).bind(this);
    currentResizeObserver = this;
  }
}

const mockRef = () => {
  const node = document.createElement('div');
  const getBoundingClientRect = jest.fn()
    .mockReturnValue({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      width: 0,
      height: 0
    });
  node.getBoundingClientRect = getBoundingClientRect;
  const ref = {
    current: {
      getDOMNode: () => node,
      getBoundingClientRect
    }
  };

  return ref;
};

describe('useBoundingClientRect', () => {
  let originalResizeObserver;

  beforeAll(() => {
    jest.useFakeTimers();
    originalResizeObserver = global.ResizeObserver;
    global.ResizeObserver = ResizeObserver;
  });

  afterAll(() => {
    global.ResizeObserver = originalResizeObserver;
    jest.useRealTimers();
    jest.resetAllMocks();
  });

  test('renders without crashing', () => {
    const ref = mockRef();
    const { result } = renderHook(() => useBoundingClientRect(ref));
    expect(result.error)
      .not
      .toBeDefined();
  });

  describe('when the container is resized', () => {
    it('propagates the size change', () => {
      const ref = mockRef();
      const { result } = renderHook(() => useBoundingClientRect(ref));

      act(() => {
        const node = ref.current.getDOMNode();
        node.getBoundingClientRect
          .mockReturnValue({
            top: 0,
            right: 200,
            bottom: 200,
            left: 0,
            width: 200,
            height: 200
          });
        node.dispatchEvent(new Event('resize'));
        currentResizeObserver.trigger();
        jest.runOnlyPendingTimers();
      });

      expect(result.current)
        .toEqual(
          expect.objectContaining({
            width: 200,
            height: 200
          })
        );
    });
  });
});
