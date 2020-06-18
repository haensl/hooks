import React from 'react';
import { act } from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import useOnScroll from './';

describe('useOnScroll', () => {
  let TestComponent;

  beforeAll(() => {
    TestComponent = ({ handler = jest.fn() }) => {
      useOnScroll(handler);
      return (<span>test</span>);
    };
  });

  it('renders without crashing', () => {
    expect(shallow.bind(shallow, <TestComponent />))
      .not.toThrow();
  });

  describe('default element', () => {
    describe('when the element is scrolled', () => {
      let handler;

      beforeAll(() => {
        handler = jest.fn();
        mount(<TestComponent handler={ handler } />);
      });

      beforeEach(() => {
        act(() => {
          window.dispatchEvent(new Event('scroll'));
        });
      });

      it('calls the handler', () => {
        expect(handler).toHaveBeenCalled();
      });
    });
  });

  describe('custom element', () => {
    let container;

    beforeAll(() => {
      container = document.createElement('div');
    });

    describe('when the element is scrolled', () => {
      let handler;

      beforeAll(() => {
        handler = jest.fn();
        const OnContainerScrollComponent = () => {
          useOnScroll(handler, container);
          return (<span>test</span>);
        };
        mount(<OnContainerScrollComponent />);
      });

      beforeEach(() => {
        act(() => {
          container.dispatchEvent(new Event('scroll'));
        });
      });

      it('calls the handler', () => {
        expect(handler)
          .toHaveBeenCalled();
      });
    });
  });
});
