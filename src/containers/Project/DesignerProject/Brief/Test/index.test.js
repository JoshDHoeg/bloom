import React from 'react';
import { shallow , mount } from 'enzyme';
import { Link } from 'react-router-dom';

import Brief from '../Brief.jsx';
import BriefEdit from '../Edit/Edit';
import BriefView from '../View/View';

import { BrowserRouter as Router} from 'react-router-dom';

import Firebase, { FirebaseContext } from '../../../../../utilities/Firebase';


/*
Want to test the following callbacks:

    this.formSubmit = this.formSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setLive = this.setLive.bind(this);
    this.deleteGoal = this.deleteGoal.bind(this);
    this.editGoalSubmit = this.editGoalSubmit.bind(this);
    this.editGoal = this.editGoal.bind(this);
    this.addGoal = this.addGoal.bind(this);
    this.handleChangeProfile = this.handleChangeProfile.bind(this);

    ...also have getProjectState
 */

describe('Example test', () => {
    it('renders without crashing', () => {
        shallow(<Brief/>)
    });

    it('checking formSubmit function', () => {

        const formSubmit = jest.fn(),
            props = {
                formSubmit
            },
            comp = (<FirebaseContext.Provider value={new Firebase()}>
                        <Router>
                            <BriefEdit {...props}/>
                        </Router>
                    </FirebaseContext.Provider>
            )

        const w = mount(comp);
        const BriefComponent = w.find(BriefEdit);
        const ButtonSubmitComponent = BriefComponent.find(Link);
        ButtonSubmitComponent.simulate('click');
        expect(formSubmit).tohaveBeenCalled();

    });



});
