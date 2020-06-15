import React from 'react';
import { render } from '@testing-library/react';
import foo from '@haensl/hooks';

describe('esm module test', () => {
  it('renders without crashing', () => {
    const Component = () => (
      <span>{ foo }</span>
    );
    expect(render.bind(render, <Component />))
      .not
      .toThrow();
  });
});
