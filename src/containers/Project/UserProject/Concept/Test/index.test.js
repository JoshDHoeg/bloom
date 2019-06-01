import React from 'react';
import { shallow , mount } from 'enzyme';

import { Concept} from '../Concept.jsx';
import Firebase from '../../../../../utilities/Firebase';

describe('Example test', () => {
    const f = new Firebase();

    it('renders without crashing',() => {
        shallow(<Concept/>)
    });

    it('Loading State initiallized?', () => {
        const wrapper = mount(<Concept firebase={f} />);
        console.log(wrapper.state());
        expect(wrapper.state('loading')).toEqual(true);
    });

    // it('Edit Props initiallized?', () => {
    //     const wrapper = mount(<Concept firebase={f} />);
    //     console.log(wrapper.prop('edit'));
    //     expect(wrapper.prop('edit')).toEqual(false);
    // });

});
