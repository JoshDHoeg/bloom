import React from 'react';
import { shallow } from 'enzyme';

import Concept from '../Concept.jsx';

describe('Example test', () => {
    it('renders without crashing',() => {
        shallow(<Concept/>)
    });
});