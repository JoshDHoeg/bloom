// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';
import { SuccessPayment } from '../../../components/PaymentStripe/frontend/Checkout.js';
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
        isPaid: false,
    };
    this.SuccessPayment = this.SuccessPayment.bind(this);
    this.updateFigma = this.updateFigma.bind(this);
    this.updateMedia = this.updateMedia.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true, edit: this.props.edit });
    this.getProjectState();
  }


  updateFigma(event){
    event.preventDefault();
    this.setState({ figmaURL: event.target.value });
  }

  updateMedia(event){
    event.preventDefault();
    this.setState({ mediaURL: event.target.value });
  }
  
  SuccessPayment  = () => {
 //       this.setState({user:{...this.state.user, isPaid: true}});
      this.revision.isPaid = true
        console.log('database:');

    }

  getProjectState = async () => {
<<<<<<< HEAD
    const project = await this.props.firebase.doGetProject(this.props.firebase.user.uid, true);
    this.revision = await project.revision;
=======
    const project = await this.props.firebase.doGetProject('userAuthID', true);
    const revision = await project.revision;
>>>>>>> parent of abc6e6c... merge conflict fixes
    const client = await project.client;
    const state = await {
        project: project,
        client: client,
        loading: false,
        figmaURL: this.revision.data.figmaURL,
        mediaURL: "https://drive.google.com/drive/folders/1H-aSlCfzkodqk8W7JWWv_z8L1GifTZR2?usp=sharing",
    }
    this.setState(state);
    return state;
}

  render() {
    console.log(this.props)
    if(this.state.edit){
        return (
            <RevisionsPageEdit  SuccessPayment={this.SuccessPayment} figmaURL={this.state.figmaURL} updateFigma={this.updateFigma}  mediaURL={this.state.mediaURL} updateMedia={this.updateMedia}/>      
        );
    }else{
        return (
            <RevisionsPageView SuccessPayment={this.SuccessPayment} figmaURL={this.state.figmaURL} mediaURL={this.state.mediaURL} />      
        );
    }

  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(RevisionsPage);