import React from 'react';
import { shallow } from 'enzyme';

import Final from '../Final.jsx';

describe('Example test', () => {
    it('renders without crashing',() => {
        shallow(<Final/>)
    });
});