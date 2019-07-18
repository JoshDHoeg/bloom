import React from 'react';
import { mount, shallow } from 'enzyme';

import Concept, {Concept as ConceptOriginal} from '../Concept.jsx';
import { BrowserRouter as Router} from 'react-router-dom';

import Firebase, { FirebaseContext } from '../../../../../utilities/Firebase';


describe('Example test', () => {
    // it('renders without crashing',() => {
    //     shallow(<Concept/>)
    // });

    it('Loading State initiallized?', () => {
        const wrapper = shallow(
            <FirebaseContext.Provider value={new Firebase()}>
                <Router>
                    <Concept/>
                </Router>
            </FirebaseContext.Provider>);



        const router = wrapper.get(1);
        // const router = wrapper.find("WithAuthorization").dive();

        // console.log(router.debug());

        // const concept = router.dive().dive().dive().dive().dive().dive();
        // console.log(concept.debug());
        // expect('completed' in wrapper.state()).toEqual(false)
      });

    //   it('render initializes the completed state',() => {
    //     const wrapper = shallow(<Concept />);
    //     expect(wrapper.state('completed')).to.equal(false);
    // });


      
});