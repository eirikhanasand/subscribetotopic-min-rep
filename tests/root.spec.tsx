/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../src/App';

// Note: import explicitly to use the types shipped with jest.
import { it, expect } from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const render = renderer.create(<App />);

    const testInstance = render.root;

    const rootComponent = testInstance.findByProps({ testID: 'eventScreen' });

    expect(rootComponent).toBeTruthy();
});
