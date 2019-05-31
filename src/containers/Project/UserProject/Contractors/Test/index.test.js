import React from 'react';
import { shallow } from 'enzyme';

import Contractors from '../Contractors.jsx';

describe('Example test', () => {
    it('renders without crashing',() => {
        shallow(<Contractors/>)
    });
});