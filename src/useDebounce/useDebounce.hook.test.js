import React from 'react';
import { mount, shallow } from 'enzyme';
import useDebounce from './';

describe('useDebounce', () => {
  let TestComponent;

  beforeAll(() => {
    jest.useFakeTimers();
    TestComponent = ({
      onClick = jest.fn(),
      debounceMs = 10
    }) => {
      const _onClick = useDebounce(onClick, debounceMs);

      return (
        <button onClick={_onClick}>click me</button>
      );
    };
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('renders without crashing', () => {
    expect(shallow.bind(shallow, <TestComponent />))
      .not
      .toThrow();
  });

  it('renders a expected', () => {
    expect(shallow(<TestComponent />))
      .toMatchSnapshot();
  });

  describe('fn', () => {
    describe('given non-function', () => {
      it('throws a TypeError', () => {
        expect(
          shallow.bind(
            shallow,
            <TestComponent
              onClick={ 1 }
            />
          )
        ).toThrow(TypeError);
      });
    });

    describe('function', () => {
      it('does not throw', () => {
        expect(
          shallow.bind(
            shallow,
            <TestComponent
              onClick={ jest.fn() }
            />
          )
        ).not
        .toThrow();
      });
    });
  });

  describe('debounceMs', () => {
    describe('given non-number', () => {
      it('throws a TypeError', () => {
        expect(
          shallow.bind(
            shallow,
            <TestComponent
              debounceMs={ 'foo' }
            />
          )
        ).toThrow(TypeError);
      });
    });

    describe('number', () => {
      it('does not throw', () => {
        expect(
          shallow.bind(
            shallow,
            <TestComponent
              debounceMs={ 50.3 }
            />
          )
        ).not
        .toThrow();
      });
    });
  });

  describe('when used as a hook', () => {
    let testComponent;
    let onClick;

    beforeAll(() => {
      onClick = jest.fn();
      testComponent = mount(
        <TestComponent
          onClick={ onClick }
        />
      );
      testComponent.find('button')
        .first()
        .simulate('click');
    });

    it('does not call the callback immediately', () => {
      expect(onClick)
        .not
        .toHaveBeenCalled();
    });

    describe('when another call happens within debounceMs', () => {
      beforeAll(() => {
        jest.advanceTimersByTime(5);
        testComponent.find('button')
          .first()
          .simulate('click');
      });

      it('buffers that call', () => {
        expect(onClick)
          .not
          .toHaveBeenCalled();
      });

      describe('when debounceMs have passed without another call', () => {
        beforeAll(() => {
          jest.advanceTimersByTime(10);
        });

        it('calls the callback', () => {
          expect(onClick)
            .toHaveBeenCalled();
        });
      });
    });
  });
});
