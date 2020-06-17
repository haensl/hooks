import React from 'react';
import { act } from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import useAnimationFrame from './';

describe('useAnimationFrame', () => {
  let TestComponent;
  let testComponent;
  let hasAnimated;
  let requestAnimationFrameSpy;

  beforeAll(() => {
    jest.useFakeTimers();
    hasAnimated = 0;
    requestAnimationFrameSpy = jest.spyOn(
      window,
      'requestAnimationFrame'
    ).mockImplementation((callback) => {
      if (hasAnimated < 2) {
        setTimeout(() => {
          callback(Date.now() + 10);
          hasAnimated++;
        }, 0);
      }
    });
    TestComponent = ({ handler = jest.fn() }) => {
      useAnimationFrame(handler);

      return (<span>useAnimationFrame test</span>);
    };
  });

  afterAll(() => {
    jest.useRealTimers();
    requestAnimationFrameSpy.mockRestore();
  });

  beforeEach(() => {
    hasAnimated = 0;
  });

  it('renders without crashing', () => {
    expect(shallow.bind(shallow, <TestComponent />))
      .not.toThrow();
  });

  it('renders as expected', () => {
    expect(shallow(<TestComponent />))
      .toMatchSnapshot();
  });

  describe('when animating', () => {
    let handler;

    beforeAll(() => {
      handler = jest.fn();
      testComponent = mount(
        <TestComponent
          handler={ handler }
        />
      );
    });

    beforeEach((done) => {
      act(() => {
        while(hasAnimated < 2) {
          jest.runOnlyPendingTimers();
        }
        testComponent.update();
        done();
      });
    });

    it('applies the animation', () => {
      expect(handler).toHaveBeenCalled();
    });
  });
});

