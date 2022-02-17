import { useState } from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import '@testing-library/jest-dom';
import useClassNames from './';

describe('useClassNames', () => {
  test('renders without crashing', () => {
    const { result } = renderHook(() => useClassNames({}));
    expect(result.error)
      .not
      .toBeDefined();
  });

  describe('given states', () => {
    test('returns the CSS classname composed from states and baseclass', () => {
      let stateA, setStateA;
      let stateB, setStateB;

      const { result } = renderHook(() => {
        [stateA, setStateA] = useState(false);
        [stateB, setStateB] = useState(false);

        return useClassNames({
          test: true,
          stateA,
          stateB
        });
      });

      expect(result.current)
        .toEqual('test');

      act(() => {
        setStateA(true);
      });

      expect(result.current)
        .toEqual('test stateA');

      act(() => {
        setStateB(true);
      });

      expect(result.current)
        .toEqual('test stateA stateB');

      act(() => {
        setStateA(false);
      });

      expect(result.current)
        .toEqual('test stateB');
    });
  });

  describe('separator', () => {
    test('can be customized', () => {
      const { result } = renderHook(() => useClassNames({
        test: true,
        stateA:
        true
      }, '--'));
      expect(result.current)
        .toEqual('test--stateA');
    });
  });
});
