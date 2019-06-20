import React from 'react';
import { shallow } from 'enzyme';

import Revisions from '../Revisions.jsx';

describe('Example test', () => {
    it('renders without crashing',() => {
        shallow(<Revisions/>)
    });
});