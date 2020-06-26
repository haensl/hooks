import React, { useRef } from 'react';
import { render } from '@testing-library/react';
import ResizeObserver from 'resize-observer-polyfill';
import { useAnimationFrame, useBoundingClientRect, useDebounce, useIsScrolling, useOnScroll, useWindowSize } from '@haensl/hooks';

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

  describe('useWindowSize', () => {
    let TestComponent;

    beforeAll(() => {
      TestComponent = () => {
        const windowSize = useWindowSize();

        return (
          <span>useWindowSize test. { windowSize }</span>
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
            <span>{ containerRect.left }</span>
            <span>{ containerRect.top }</span>
            <span>{ containerRect.width }</span>
            <span>{ containerRect.height }</span>
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
