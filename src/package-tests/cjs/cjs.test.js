import React from 'react';
import ReactDOM from 'react-dom';
import foo from '@haensl/hooks';

describe('cjs module test', () => {
  let container;
  let Component;

  beforeEach(() => {
    container = document.createElement('div');
    Component = () => (
      <span>{ foo }</span>
    );
  });

  it('renders without crashing', () => {
    ReactDOM.render(
      <Component />,
      container
    );
    ReactDOM.unmountComponentAtNode(container);
  });
});

