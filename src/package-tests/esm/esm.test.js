import React from 'react';
import { render } from '@testing-library/react';
import { useDebounce } from '@haensl/hooks';

describe('esm module test', () => {
  describe('useDebounce', () => {
    let TestComponent;

    beforeAll(() => {
      TestComponent = () => {
        const handler = useDebounce(jest.fn(), 10);

        return (
          <button
            onClick={ handler }
          >click me</button>
        );
      };
    });

    it('renders without crashing', () => {
      expect(render.bind(render, <TestComponent />))
        .not
        .toThrow();
    });
  });
});
