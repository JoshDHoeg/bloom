import React from 'react';
import ReactDOM from 'react-dom';
import { shallow , mount } from 'enzyme';
import { Link } from 'react-router-dom';

import Brief from '../Brief.jsx';
import { BriefEdit , BriefPageEdit }from '../Edit/Edit';
import BriefView from '../View/View';

import { BrowserRouter as Router} from 'react-router-dom';

import Firebase, { FirebaseContext } from '../../../../../utilities/Firebase';

import { Component } from 'react';


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

const briefTemp = {
    goals: [],
        address: '',
        budget: '',
        narrative: '',
        media: '',
        profile: {
        spacing: '',
            variety: '',
            edging: '',
            ground: '',
            form: ''
    }
};

describe('Example test', () => {
    it('renders without crashing', () => {
        shallow(<Brief/>)
    });

    it('checking formSubmit function', () => {
        const formSubmitTest = jest.fn();

        //without firebase version....find works
        const BriefPageComponent= mount( <BriefPageEdit formSubmit={formSubmitTest} brief={briefTemp}/> );
        const buttonSubmit = BriefPageComponent.find('button.button-submit');
        buttonSubmit.simulate('click');
        expect(formSubmitTest).toHaveBeenCalled();



        //with firebase version...find doesn't work, not sure why
        const tempWitFirebase = (
                        <FirebaseContext.Provider value={new Firebase()}>
                            <Router class='dilly'>
                                <BriefEdit class='dilly' formSubmit={formSubmitTest} brief={briefTemp} />
                            </Router>
                        </FirebaseContext.Provider>
                    );

        const temp = mount(tempWitFirebase);
        //console.log(temp.debug());
    });



});
