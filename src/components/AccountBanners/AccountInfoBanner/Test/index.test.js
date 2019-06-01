import React from 'react';
import { shallow } from 'enzyme';

import AccountInfoBanner from '../AccountInfoBanner.jsx';

describe('Account Info Banner Component Test', () => {
    it('renders without crashing',() => {
        shallow(<AccountInfoBanner/>)
    });
});