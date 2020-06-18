import React from 'react';
import { render } from '@testing-library/react';
import { useAnimationFrame, useDebounce, useIsScrolling, useOnScroll } from '@haensl/hooks';

describe('esm module test', () => {
  describe('useDebounce', () => {
    let TestComponent;

    beforeAll(() => {
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
});
