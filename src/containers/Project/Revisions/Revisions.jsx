// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';
//import { SuccessPayment } from '../../../components/PaymentStripe/frontend/Checkout.js';
//IMPORT UTILITIES
// import { withFirebase } from '../../utilities/Firebase';
import { withAuthorization } from '../../../utilities/Session';

import RevisionsPageView from './View/View';
import RevisionsPageEdit from './Edit/Edit';

class RevisionsPage extends Component {
  revision;
  constructor(props) {
    super(props);
    this.state = {
        loading: false,
        edit: false,
        figmaURL: '',
        mediaURL: '',
        revision: {
          media:'',
          figma: '',
          isPaid: false,
        }
    };
    this.SuccessPayment = this.SuccessPayment.bind(this);
    this.updateFigma = this.updateFigma.bind(this);
    this.updateMedia = this.updateMedia.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true, edit: this.props.edit });
    if(this.props.location.state){
      this.setState({projectIndex: this.props.location.state.projectIndex});
      this.getProjectState(this.props.location.state.projectIndex);
    } else{
      this.setState({projectIndex: 0});
      this.getProjectState(0);
    }
  }


  updateFigma(event){
    event.preventDefault();
    this.setState({ figmaURL: event.target.value });
  }

  updateMedia(event){
    event.preventDefault();
    this.setState({ mediaURL: event.target.value });
  }
  
  SuccessPayment(){
//      this.setState({user:{...this.state.revisions, isPaid: true}});
    console.log('database:');      
    this.revision.isPaid = true;
    }

  getProjectState = async (id) => {
    const index = this.props.firebase.activeProject;
    const project = await this.props.firebase.doGetProject(this.props.firebase.user.uid, 0, true);
    console.log(project);
    this.revision = await project.revision;
    console.log(this.revision);
    const client = await project.client;
    const state = await {
        client: client,
        loading: false,
//        isPaid: this.revision.isPaid,
        revision: {
          ...this.revision.getAll()
        },
    }

    this.setState(state);
    return state;
}

  render() {
    console.log('props:', this.props)
    console.log('isPaid:', this.isPaid)
    if(this.state.edit){
        return (
            <RevisionsPageEdit  SuccessPayment={this.SuccessPayment} figmaURL={this.state.figmaURL} updateFigma={this.updateFigma}  mediaURL={this.state.mediaURL} updateMedia={this.updateMedia}/>
        );
    }else{
        return (
            <RevisionsPageView  SuccessPayment={this.SuccessPayment} figmaURL={this.state.figmaURL} mediaURL={this.state.mediaURL} />
        );
    }

  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(RevisionsPage);
