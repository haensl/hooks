import React from 'react';
import { act } from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import useWindowSize from './';

describe('useWindowSize', () => {
  let TestComponent;

  beforeAll(() => {
    TestComponent = () => {
      const windowSize = useWindowSize();

      if (windowSize) {
        return (<span>{`${windowSize.width},${windowSize.height}`}</span>);
      }

      return (<span>no window size</span>);
    };

    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('renders without crashing', () => {
    expect(shallow.bind(shallow, <TestComponent />))
      .not
      .toThrow();
  });

  it('renders as expected', () => {
    expect(shallow(<TestComponent />))
      .toMatchSnapshot();
  });

  describe('when the window is resized', () => {
    let testComponent;

    beforeAll(() => {
      testComponent = mount(<TestComponent />);
    });

    beforeEach(() => {
      act(() => {
        window.innerHeight = 200;
        window.innerWidth = 150;
        window.dispatchEvent(new Event('resize'));
        jest.runOnlyPendingTimers();
        testComponent.update();
      });
    });

    it('propagates the window size', () => {
      expect(testComponent.text())
        .toEqual('150,200');
    });

    it('renders as expected', () => {
      expect(testComponent)
        .toMatchSnapshot();
    });
  });
});
