import React from 'react';
import { act } from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import useWindowScroll from './';

describe('useWindowScroll', () => {
  let TestComponent;
  let testComponent;
  let scroll;

  beforeAll(() => {
    jest.useFakeTimers();
    TestComponent = () => {
      scroll = useWindowScroll();

      if (scroll) {
        return (<span>{`${scroll.x},${scroll.y}`}</span>);
      }

      return (<span>no window scroll</span>);
    };
  });

  it('renders without crashing', () => {
    expect(shallow.bind(shallow, <TestComponent />))
      .not.toThrow();
  });

  it('renders as expected', () => {
    expect(shallow.bind(shallow, <TestComponent />))
      .toMatchSnapshot();
  });

  describe('when the window is scrolled', () => {
    beforeAll(() => {
      testComponent = mount(<TestComponent />);
    });

    beforeEach(() => {
      act(() => {
        window.scrollX = 10;
        window.scrollY = 50;
        window.dispatchEvent(new Event('scroll'));
        jest.runOnlyPendingTimers();
        testComponent.update();
      });
    });

    it('updates the window scroll position', () => {
      expect(scroll).toEqual(
        expect.objectContaining({
          x: 10,
          y: 50
        })
      );
    });

    it('renders as expected', () => {
      expect(testComponent).toMatchSnapshot();
    });
  });
});
