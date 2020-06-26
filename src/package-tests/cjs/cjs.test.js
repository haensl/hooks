import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import ResizeObserver from 'resize-observer-polyfill';
import { useDebounce, useBoundingClientRect, useAnimationFrame, useIsScrolling, useOnScroll, useWindowSize } from '@haensl/hooks';

describe('cjs module test', () => {
  let container;

  beforeAll(() => {
    container = document.createElement('div');
    global.ResizeObserver = ResizeObserver;
  });

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
      ReactDOM.render(
        <TestComponent />,
        container
      );
      ReactDOM.unmountComponentAtNode(container);
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
      ReactDOM.render(
        <TestComponent />,
        container
      );
      ReactDOM.unmountComponentAtNode(container);
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
      ReactDOM.render(
        <TestComponent />,
        container
      );
      ReactDOM.unmountComponentAtNode(container);
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
      ReactDOM.render(
        <TestComponent />,
        container
      );
      ReactDOM.unmountComponentAtNode(container);
    });
  });

  describe('useWindowSize', () => {
    let TestComponent;

    beforeAll(() => {
      TestComponent = () => {
        const windowSize = useWindowSize();

        return (
          <span>useWindoSize test. { windowSize }</span>
        );
      };
    });

    it('renders without crashing', () => {
      ReactDOM.render(
        <TestComponent />,
        container
      );
      ReactDOM.unmountComponentAtNode(container);
    });
  });

  describe('useBoundingClientRect', () => {
    let TestComponent;

    beforeAll(() => {
      TestComponent = () => {
        const ref = useRef();
        const containerRect = useBoundingClientRect(ref);

        return (
          <div ref={ ref }>
            <span>useBoundingClientRect test.</span>
            <span>{ containerRect.left }</span>
            <span>{ containerRect.top }</span>
            <span>{ containerRect.width }</span>
            <span>{ containerRect.height }</span>
          </div>
        );
      };
    });

    it('renders without crashing', () => {
      ReactDOM.render(
        <TestComponent />,
        container
      );
      ReactDOM.unmountComponentAtNode(container);
    });
  });
});

