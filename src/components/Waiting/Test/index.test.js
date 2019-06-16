import React from 'react';
import { shallow } from 'enzyme';

import Waiting from '../Waiting.jsx';

describe('Waiting Page Test', () => {
    it('renders without crashing',() => {
        shallow(<Waiting/>)
    });
});