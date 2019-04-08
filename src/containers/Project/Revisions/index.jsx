// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';

//IMPORT UTILITIES
// import { withFirebase } from '../../utilities/Firebase';
import { withAuthorization } from '../../../utilities/Session';

import RevisionsPageView from './View';
import RevisionsPageEdit from './Edit';

class RevisionsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loading: false,
        edit: false,
        concept: {
            goals: [],
            location: '',
            budget: ''
        },
    };
  }

  componentDidMount() {
    this.setState({ loading: true, edit: this.props.edit });
    this.getProjectState();
  }

  getProjectState = async () => {
    const project = await this.props.firebase.doGetProject('userAuthID', true);
    const concepts = await project.concept;
    const client = await project.client;
    const state = await {
        project: project,
        client: client,
        loading: false
    }
    this.setState(state);
    return state;
}

  render() {
    if(this.state.edit){
        return (
            <RevisionsPageEdit  />      
        );
    }else{
        return (
            <RevisionsPageView  />      
        );
    }

  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(RevisionsPage);