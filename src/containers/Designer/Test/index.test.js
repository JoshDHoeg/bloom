import React from 'react';
import { shallow } from 'enzyme';

import Designer from '../Designer.jsx';

describe('Account Page Test', () => {
    it('renders without crashing',() => {
        shallow(<Designer/>)
    });
});