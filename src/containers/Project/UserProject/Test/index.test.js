import React from 'react';
import { shallow } from 'enzyme';

import UserProject from '../UserProject.jsx';

describe('Project Page Test', () => {
    it('renders without crashing',() => {
        shallow(<UserProject/>)
    });
});