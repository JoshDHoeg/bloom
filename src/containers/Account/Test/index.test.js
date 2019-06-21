import React from 'react';
import { shallow } from 'enzyme';

import Account from '../Account.jsx';

describe('Account Page Test', () => {
    it('renders without crashing',() => {
        shallow(<Account/>)
    });
});