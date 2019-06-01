import React from 'react';
import { mount, shallow } from 'enzyme';
// import {MemoryRouter as Router } from 'react-router-dom';

import Concept, {Concept as ConceptOriginal} from '../Concept.jsx';

// const mountWithRouter = node => mount(<Router>{node}</Router>)

describe('Example test', () => {
    // it('renders without crashing',() => {
    //     shallow(<Concept/>)
    // });

    it('Loading State initiallized?', () => {
        const wrapper = shallow(<Concept.WrappedComponent.WrappedComponent />);
        console.log(wrapper.debug());
        // const concept = wrapper.find(ConceptOriginal);
        // console.log(concept);
        expect('completed' in wrapper.state()).toEqual(false)
      });

    //   it('render initializes the completed state',() => {
    //     const wrapper = shallow(<Concept />);
    //     expect(wrapper.state('completed')).to.equal(false);
    // });


      
});