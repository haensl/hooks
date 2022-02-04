import React, { useRef } from 'react';
import { render } from '@testing-library/react';
import ResizeObserver from 'resize-observer-polyfill';
/* eslint-disable object-curly-newline */
import {
  useAnimationFrame,
  useBoundingClientRect,
  useDebounce,
  useIsMounted,
  useIsomorphicLayoutEffect,
  useIsScrolling,
  useOnScroll,
  usePrevious,
  useWindowScroll,
  useWindowSize
} from '@haensl/react-hooks';
/* eslint-enable object-curly-newline */

describe('esm module test', () => {
  describe('useDebounce', () => {
    let TestComponent;

    beforeAll(() => {
      global.ResizeObserver = ResizeObserver;
      TestComponent = () => {
        const handler = useDebounce(jest.fn(), 10);

        return (
          <button
            onClick={ handler }
          >click me</button>
        );
      };
    });

    it('renders without crashing', () => {
      expect(render.bind(render, <TestComponent />))
        .not
        .toThrow();
    });
  });

  describe('useAnimationFrame', () => {
    let TestComponent;

    beforeAll(() => {
      TestComponent = () => {
        useAnimationFrame(jest.fn());

        return (
          <span>useAnimationFrame test</span>
        );
      };
    });

    it('renders without crashing', () => {
      expect(render.bind(render, <TestComponent />))
        .not
        .toThrow();
    });
  });

  describe('useOnScroll', () => {
    let TestComponent;

    beforeAll(() => {
      TestComponent = () => {
        useOnScroll(jest.fn());

        return (
          <span>useOnScroll test</span>
        );
      };
    });

    it('renders without crashing', () => {
      expect(render.bind(render, <TestComponent />))
        .not
        .toThrow();
    });
  });

  describe('usePrevious', () => {
    let TestComponent;

    beforeAll(() => {
      TestComponent = () => {
        const previous = usePrevious(5);

        return (
          <span>usePrevious test { previous }</span>
        );
      };
    });

    it('renders without crashing', () => {
      expect(render.bind(render, <TestComponent />))
        .not
        .toThrow();
    });
  });

  describe('useIsMounted', () => {
    let TestComponent;

    beforeAll(() => {
      TestComponent = () => {
        const isMounted = useIsMounted();

        return (
          <span>useIsMounted test. { isMounted }</span>
        );
      };
    });

    it('renders without crashing', () => {
      expect(render.bind(render, <TestComponent />))
        .not
        .toThrow();
    });
  });

  describe('useIsomorphicLayoutEffect', () => {
    let TestComponent;

    beforeAll(() => {
      TestComponent = () => {
        useIsomorphicLayoutEffect(() => {
          // do nothing
        }, []);

        return (
          <span>useIsomorphicLayoutEffect test.</span>
        );
      };
    });

    it('renders without crashing', () => {
      expect(render.bind(render, <TestComponent />))
        .not
        .toThrow();
    });
  });

  describe('useIsScrolling', () => {
    let TestComponent;

    beforeAll(() => {
      TestComponent = () => {
        const isScrolling = useIsScrolling();

        return (
          <span>useIsScrolling test. { isScrolling }</span>
        );
      };
    });

    it('renders without crashing', () => {
      expect(render.bind(render, <TestComponent />))
        .not
        .toThrow();
    });
  });

  describe('useWindowScroll', () => {
    let TestComponent;

    beforeAll(() => {
      TestComponent = () => {
        const windowScroll = useWindowScroll();

        return (
          <div>
            <span>useWindowScroll test.</span>
            { windowScroll && (
              <div>
                <span>{ windowScroll.x }</span>
                <span>{ windowScroll.y }</span>
              </div>
            )}
          </div>
        );
      };
    });

    it('renders without crashing', () => {
      expect(render.bind(render, <TestComponent />))
        .not
        .toThrow();
    });
  });

  describe('useWindowSize', () => {
    let TestComponent;

    beforeAll(() => {
      TestComponent = () => {
        const windowSize = useWindowSize();

        return (
          <div>
            <span>useWindowSize test.</span>
            { windowSize && (
              <div>
                <span>{ windowSize.width }</span>
                <span>{ windowSize.height }</span>
              </div>
            )}
          </div>
        );
      };
    });

    it('renders without crashing', () => {
      expect(render.bind(render, <TestComponent />))
        .not
        .toThrow();
    });
  });

  describe('useBoundingClientRect', () => {
    let TestComponent;

    beforeAll(() => {
      TestComponent = () => {
        const ref = useRef();
        const containerRect = useBoundingClientRect(ref);

        return (
          <div ref={ref}>
            <span>useBoundingClientRect test</span>
            { containerRect && (
              <div>
                <span>{ containerRect.left }</span>
                <span>{ containerRect.top }</span>
                <span>{ containerRect.width }</span>
                <span>{ containerRect.height }</span>
              </div>
            )}
          </div>
        );
      };
    });

    it('renders without crashing', () => {
      expect(render.bind(render, <TestComponent />))
        .not
        .toThrow();
    });
  });
});
