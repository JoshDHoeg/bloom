import React from 'react';
import { shallow } from 'enzyme';

import Final from '../Final.jsx';

describe('User Final Page', () => {
    it('renders without crashing',() => {
        shallow(<Final/>)
    });
});