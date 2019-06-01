import React from 'react';
import { shallow } from 'enzyme';

import DesignerProject from '../DesignerProject.jsx';

describe('Designer Project Page Test', () => {
    it('renders without crashing',() => {
        shallow(<DesignerProject/>)
    });
});