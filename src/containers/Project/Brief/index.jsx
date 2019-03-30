// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';

//IMPORT UTILITIES
// import { withFirebase } from '../../utilities/Firebase';
import { withAuthorization } from '../../../utilities/Session';

import BriefView from './View';
import BriefEdit from './Edit';

class BriefPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loading: false,
        edit: false,
        brief: {
            goals: [],
            location: '',
            budget: '',
            narrative: ''
        },
    };
  }

  componentDidMount() {
    this.setState({ loading: true, edit: this.props.edit });
    this.getProjectState();
  }

  getProjectState = async () => {
    const project = await this.props.firebase.doGetProject('userAuthID', true);
    const briefs = await project.briefs;
    const client = await project.client;
    const state = await {
        project: project,
        brief: briefs[0],
        client: client,
        loading: false
    }
    this.setState(state);
    return state;
}

  render() {
    if(this.state.edit){
        return (
            <BriefEdit brief={this.state.brief} />      
        );
    }else{
        return (
            <BriefView brief={this.state.brief} />      
        );
    }

  }
}


const condition = authUser => !!authUser;

export default withAuthorization(condition)(BriefPage);
