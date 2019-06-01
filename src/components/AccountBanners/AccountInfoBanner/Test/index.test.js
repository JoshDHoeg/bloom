import React from 'react';
import { shallow } from 'enzyme';


import AccountInfoBanner from '../AccountInfoBanner';

describe('Example test', () => {
    it('renders without crashing',() => {
        shallow(<AccountInfoBanner/>)
    });
    it('check AccountInfoBanner Props', () => {
        const props = {
            name:'',
            },
            PropOutput = shallow(<AccountInfoBanner {...props} />);
        expect(PropOutput.prop('name')).toEqual('Meier');
    });
});
