import React, { useRef } from 'react';
import { act } from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import useBoundingClientRect from './';

let currentResizeObserver;

class ResizeObserver {
  constructor(callback) {
    this.targets = [];
    this.callback = callback;
    this.observe = jest.fn()
      .mockImplementation(function(target) {
        this.targets.push(target);
      }).bind(this);

    this.unobserve = jest.fn()
      .mockImplementation(function(target) {
        this.targets = this.targets.filter((t) => t !== target);
      }).bind(this);

    this.trigger = jest.fn()
      .mockImplementation(function() {
        for (const target of this.targets) {
          this.callback({ target });
        }
      }).bind(this);
    currentResizeObserver = this;
  }
}

describe('useBoundingClientRect', () => {
  let TestComponent;
  let originalResizeObserver;
  let containerRect;

  beforeAll(() => {
    jest.useFakeTimers();
    originalResizeObserver = global.ResizeObserver;
    global.ResizeObserver = ResizeObserver;
    TestComponent = () => {
      const ref = useRef();
      containerRect = useBoundingClientRect(ref);

      if (containerRect) {
        return (
          <div ref={ref}>
            <span>{containerRect.x},{containerRect.y},{containerRect.width},{containerRect.height}</span>
          </div>
        );
      }

      return (
        <div ref={ref}>
          <span>no client rect</span>
        </div>
      );
    };
  });

  afterAll(() => {
    global.ResizeObserver = originalResizeObserver;
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

  describe('when the container is resized', () => {
    let testComponent;

    beforeAll(() => {
      testComponent = mount(<TestComponent />);
      act(() => {
        const node = testComponent.getDOMNode();
        node.getBoundingClientRect = jest.fn()
          .mockReturnValue({
            top: 0,
            right: 200,
            bottom: 200,
            left: 0,
            width: 200,
            height: 200
          });
        node.dispatchEvent(new Event('resize'));
        currentResizeObserver.trigger();
        jest.runOnlyPendingTimers();
        testComponent.update();
      });
    });

    afterAll(() => {
      containerRect = undefined;
    });

    it('renders as expected', () => {
      expect(testComponent).toMatchSnapshot();
    });

    it('propagates the size change', () => {
      expect(containerRect).toEqual(
        expect.objectContaining({
          width: 200,
          height: 200
        })
      );
    });
  });
});
