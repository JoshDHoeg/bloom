// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';

//IMPORT UTILITIES
// import { withFirebase } from '../../utilities/Firebase';
import { withAuthorization } from '../../../utilities/Session';

import FinalPageView from './View/View';
import FinalPageEdit from './Edit/Edit';

class FinalPage extends Component {
  final;
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
    console.log("we updated?");
    this.final.media = this.state.final.media;
    this.final.video = this.state.final.video;
    this.final.figma = this.state.final.figma;
    this.final.feedback = this.state.final.feedback;
  }

  completed(){
    this.final.completed = true;
    this.formSubmit();
  }
  
  handleChange(event) {
    event.preventDefault();
    console.log(event.target.name);
    this.setState({
      final: {
        ...this.state.final,
        [event.target.name]: event.target.value
      }
    });
  }

  getProjectState = async () => {
    const project = await this.props.firebase.doGetProject(this.props.firebase.user.uid, true);
    this.final = await project.final;
    const client = await project.client;
    const state = await {
        client: client,
        loading: false,
        final: {
          ...this.final.getAll()
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
            <FinalPageView final={this.state.final} />      
        );
    }

  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(FinalPage);
