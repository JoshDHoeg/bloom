import React from 'react';
import { shallow } from 'enzyme';

import { Concept} from '../Concept.jsx';

describe('Example test', () => {
    it('renders without crashing',() => {
        shallow(<Concept/>)
    });

    it('Loading State initiallized?', () => {
        const wrapper = shallow(<Concept/>);
        console.log(wrapper.state());
        expect(wrapper.state('loading')).toEqual(true)
      });

      it('Edit Props initiallized?', () => {
        const wrapper = shallow(<Concept/>);
        console.log(wrapper.props());
        expect(wrapper.props('edit')).toEqual(true)
      });
      
});