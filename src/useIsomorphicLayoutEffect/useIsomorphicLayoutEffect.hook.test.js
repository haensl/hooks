import { useEffect, useLayoutEffect } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import '@testing-library/jest-dom';
import useIsomorphicLayoutEffect from './';

describe('useIsomorphicLayoutEffect', () => {
  test('renders without crashing', () => {
    const { result } = renderHook(
      () => useIsomorphicLayoutEffect(() => {
        // do nothing
      }, [])
    );
    expect(result.error)
      .not
      .toBeDefined();
  });

  describe('on the client', () => {
    test('it is equivalent to useLayoutEffect', () => {
      expect(useIsomorphicLayoutEffect)
        .toEqual(useLayoutEffect);
    });
  });

  describe('on the server', () => {
    let windowSpy;

    beforeEach(() => {
      jest.resetModules();
      windowSpy = jest.spyOn(global, 'window', 'get')
        .mockReturnValue(undefined);
    });

    afterEach(() => {
      windowSpy.mockRestore();
    });

    test('it is equivalent to useEffect', () => {
      expect(require('./').default.toString())
        .toEqual(useEffect.toString());
    });
  });
});
