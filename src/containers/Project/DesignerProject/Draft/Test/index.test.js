import React from 'react';
import { shallow } from 'enzyme';

import Draft from '../Draft.jsx';

describe('Example test', () => {
    it('renders without crashing',() => {
        shallow(<Draft/>)
    });
});