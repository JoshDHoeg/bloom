import React from 'react';
import { shallow } from 'enzyme';
import Final from '../Final.jsx';
import Jest from 'jest'


describe('Example test', () => {
    it('renders without crashing',() => {
        shallow(<Final/>)
    });
});

