import React from 'react';
import ReactDOM from 'react-dom';
import { useDebounce } from '@haensl/hooks';

describe('cjs module test', () => {
  let container;

  beforeAll(() => {
    container = document.createElement('div');
  });

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
      ReactDOM.render(
        <TestComponent />,
        container
      );
      ReactDOM.unmountComponentAtNode(container);
    });
  });
});

