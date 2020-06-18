import React from 'react';
import { act } from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import useIsScrolling from './';

describe('useIsScrolling', () => {
  let TestComponent;
  let testComponent;
  let isScrolling;

  beforeAll(() => {
    jest.useFakeTimers();
    TestComponent = () => {
      isScrolling = useIsScrolling();

      if (typeof isScrolling === 'boolean') {
        return (<span>isScrolling: {
          (isScrolling && 'true') || 'false'
        }</span>);
      }

      return (<span>no is scrolling</span>);
    };
  });

  it('renders without crashing', () => {
    expect(shallow.bind(shallow, <TestComponent />))
      .not.toThrow();
  });

  it('renders as expected', () => {
    expect(shallow(<TestComponent />))
      .toMatchSnapshot();
  });

  describe('when the window is scrolled', () => {
    beforeAll(() => {
      testComponent = mount(<TestComponent />);
    });

    beforeEach(() => {
      act(() => {
        window.scrollY = 50;
        window.dispatchEvent(new Event('scroll'));
        testComponent.update();
      });
    });

    it('indicates that the window is being scrolled', () => {
      expect(isScrolling).toBe(true);
    });

    it('renders as expected', () => {
      expect(testComponent)
        .toMatchSnapshot();
    });

    describe('and scrolling has finished', () => {
      beforeEach(() => {
        act(() => {
          jest.advanceTimersByTime(100);
          testComponent.update();
        });
      });

      it('indicates that the window has stopped scrolling', () => {
        expect(isScrolling).toBe(false);
      });

      it('renders as expected', () => {
        expect(testComponent)
          .toMatchSnapshot();
      });
    });
  });
});
