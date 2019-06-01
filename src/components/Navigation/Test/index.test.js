import React from 'react';
import { shallow } from 'enzyme';

import UserNavigation from '../UserNavigation.jsx';

describe('User Navigation Component Test', () => {
    it('renders without crashing',() => {
        shallow(<UserNavigation/>)
    });
});