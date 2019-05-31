import React from 'react';
import { shallow } from 'enzyme';

import Brief from '../Brief.jsx';

describe('Example test', () => {
    it('renders without crashing',() => {
        shallow(<Brief/>)
    });
});