import React from 'react';
import renderer from 'react-test-renderer';
import Home from './Home';

it('renders without crashing', () => {
  const component = renderer.create(
    <Home />,
);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
