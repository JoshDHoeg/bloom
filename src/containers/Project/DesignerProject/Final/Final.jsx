// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';

//IMPORT UTILITIES
// import { withFirebase } from '../../utilities/Firebase';
import { withAuthorization } from '../../../../utilities/Session/index';

import FinalPageView from './View/View';
import FinalPageEdit from './Edit/Edit';

class FinalPage extends Component {
  final;
  draft;
  constructor(props) {
    super(props);
    this.state = {
        loading: false,
        edit: false,
        final: {
          media:'',
          video: '',
          figma: '',
          feedback: ''
        },
        draft: {
          approved: false
        }

    };

    this.formSubmit = this.formSubmit.bind(this);
    this.completed = this.completed.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true, edit: this.props.edit });
    this.getProjectState();
  }

  formSubmit(){
    this.final.media = this.state.final.media;
    this.final.video = this.state.final.video;
    this.final.figma = this.state.final.figma;
    this.final.feedback = this.state.final.feedback;
  }

  completed(){
    this.final.completed = true;
    this.formSubmit();
  }

  Approved() {
    this.final.approved = true;
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      final: {
        ...this.state.final,
        [event.target.name]: event.target.value
      }
    });
  }

  getProjectState = async () => {
    const project = await this.props.firebase.doGetProject(this.props.firebase.user.uid, this.props.firebase.activeProject, true);
    this.final = await project.final;
    this.draft = await project.draft;
    const client = await project.client;
    const state = await {
        client: client,
        loading: false,
        final: {
          ...this.final.getAll()
        },
        draft: {
          ...this.draft.getAll()
        }
    }
    this.setState(state);
    return state;
}

  render() {
    if(this.state.edit){
        return (
            <FinalPageEdit final={this.state.final} completed={this.completed} handleChange={this.handleChange} formSubmit={this.formSubmit} />
        );
    }else{
        return (
            <FinalPageView Approved={this.Approved} draft={this.state.draft} isDesigner={this.props.firebase.user._isDesigner} final={this.state.final} />
        );
    }

  }
}

const condition = role => role > 0;

export default withAuthorization(condition)(FinalPage);
