import React from 'react';
import { shallow } from 'enzyme';


import Final from '../Final.jsx';

describe('Example test', () => {
    it('renders without crashing',() => {
        shallow(<Final/>)
    });
    it('check Final Props', () => {
        const props = {
            completed: false,
            figma: '',
            },
            PropOutput = shallow(<Final {...props} />);
        expect(PropOutput.prop('completed')).toEqual(undefined);
    });
});