import { useState } from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import '@testing-library/jest-dom';
import usePrevious from './';

describe('usePrevious', () => {
  test('renders without crashing', () => {
    const val = 'foo';
    const { result } = renderHook(() => usePrevious(val));
    expect(result.error)
      .not
      .toBeDefined();
  });

  describe('when the value changes', () => {
    test('returns the previous value', () => {
      let val, setVal;

      const { result } = renderHook(() => {
        [val, setVal] = useState(5);
        return usePrevious(val);
      });

      act(() => {
        setVal(10);
      });

      expect(result.current)
        .toEqual(5);

      act(() => {
        setVal(11);
      });

      expect(result.current)
        .toEqual(10);
    });
  });
});
