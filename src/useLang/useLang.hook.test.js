import { renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';

import useLang from './';

describe('useLang', () => {
  test('renders without crashing', () => {
    const { result } = renderHook(() => useLang());
    expect(result.error)
      .not
      .toBeDefined();
  });

  describe('defaultLang', () => {
    let spy;
    beforeEach(() => {
      spy = jest.spyOn(navigator, 'language', 'get')
        .mockReturnValue(null);
    });

    afterEach(() => {
      spy.mockRestore();
    });

    it('defaults to "en"', () => {
      const { result } = renderHook(() => useLang());
      expect(result.current)
        .toEqual('en');
    });

    it('can be set', () => {
      const { result } = renderHook(() => useLang({ defaultLang: 'de' }));
      expect(result.current)
        .toEqual('de');
    });
  });

  describe('if navigator is available', () => {
    let spy;
    beforeEach(() => {
      spy = jest.spyOn(navigator, 'language', 'get')
        .mockReturnValue('fr');
    });

    afterEach(() => {
      spy.mockRestore();
    });

    test('takes lang from the navigator', () => {
      const { result } = renderHook(() => useLang());
      expect(result.current)
        .toEqual('fr');
    });
  });
});
