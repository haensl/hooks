import React from 'react';
import ReactDOM from 'react-dom';
import { useDebounce, useAnimationFrame, useIsScrolling, useOnScroll } from '@haensl/hooks';

describe('cjs module test', () => {
  let container;

  beforeAll(() => {
    container = document.createElement('div');
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
});

