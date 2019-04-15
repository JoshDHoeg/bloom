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

    this.updateFigma = this.updateFigma.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true, edit: this.props.edit });
    this.getProjectState();
  }


  updateFigma(event){
    event.preventDefault();
    this.setState({ videoId: event.target.value });
  }

  getProjectState = async () => {
    const project = await this.props.firebase.doGetProject('userAuthID', true);
    const revision = await project.revision;
    const client = await project.client;
    const state = await {
        project: project,
        client: client,
        loading: false,
        figmaURL: revision.data.figmaURL,
    }
    this.setState(state);
    return state;
}

  render() {
    if(this.state.edit){
        return (
            <RevisionsPageEdit  figmaURL={this.state.figmaURL} updateFigma={this.updateFigma}/>      
        );
    }else{
        return (
            <RevisionsPageView  figmaURL={this.state.figmaURL} />      
        );
    }

  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(RevisionsPage);