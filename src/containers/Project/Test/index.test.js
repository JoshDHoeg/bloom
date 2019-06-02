import React from 'react';
import { shallow } from 'enzyme';

import Project from '../Project.jsx';

describe('Project Page Test', () => {
    it('renders without crashing',() => {
        shallow(<Project/>)
    });
});