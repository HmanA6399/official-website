import React from 'react';
import Info from '../index';

import { create } from "react-test-renderer";

// because it's static component and doesn't change often
it('matches snapshot', () => {
  const component = create(<Info />);

  expect(component.toJSON()).toMatchSnapshot()
});