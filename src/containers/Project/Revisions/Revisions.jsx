// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';
<<<<<<< HEAD
import { SuccessPayment } from '../../../components/PaymentStripe/frontend/Checkout.js';
=======

>>>>>>> 56a5ed899c5775f76634bc9d54ec44514c16956c
//IMPORT UTILITIES
// import { withFirebase } from '../../utilities/Firebase';
import { withAuthorization } from '../../../utilities/Session';

import RevisionsPageView from './View/View';
import RevisionsPageEdit from './Edit/Edit';

class RevisionsPage extends Component {
<<<<<<< HEAD
  revision;
=======
>>>>>>> 56a5ed899c5775f76634bc9d54ec44514c16956c
  constructor(props) {
    super(props);
    this.state = {
        loading: false,
        edit: false,
        figmaURL: '',
        mediaURL: '',
<<<<<<< HEAD
        isPaid: false,
    };
    this.SuccessPayment = this.SuccessPayment.bind(this);
=======
    };

>>>>>>> 56a5ed899c5775f76634bc9d54ec44514c16956c
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
<<<<<<< HEAD
  
  SuccessPayment  = () => {
 //       this.setState({user:{...this.state.user, isPaid: true}});
      this.revision.isPaid = true
        console.log('database:');

    }

  getProjectState = async () => {
    const project = await this.props.firebase.doGetProject(this.props.firebase.user.uid, true);
    this.revision = await project.revision;
=======

  getProjectState = async () => {
    const project = await this.props.firebase.doGetProject('userAuthID', true);
    const revision = await project.revision;
>>>>>>> 56a5ed899c5775f76634bc9d54ec44514c16956c
    const client = await project.client;
    const state = await {
        project: project,
        client: client,
        loading: false,
<<<<<<< HEAD
        figmaURL: this.revision.data.figmaURL,
=======
        figmaURL: revision.data.figmaURL,
>>>>>>> 56a5ed899c5775f76634bc9d54ec44514c16956c
        mediaURL: "https://drive.google.com/drive/folders/1H-aSlCfzkodqk8W7JWWv_z8L1GifTZR2?usp=sharing",
    }
    this.setState(state);
    return state;
}

  render() {
<<<<<<< HEAD
    console.log(this.props)
    if(this.state.edit){
        return (
            <RevisionsPageEdit  SuccessPayment={this.SuccessPayment} figmaURL={this.state.figmaURL} updateFigma={this.updateFigma}  mediaURL={this.state.mediaURL} updateMedia={this.updateMedia}/>      
        );
    }else{
        return (
            <RevisionsPageView SuccessPayment={this.SuccessPayment} figmaURL={this.state.figmaURL} mediaURL={this.state.mediaURL} />      
=======
    if(this.state.edit){
        return (
            <RevisionsPageEdit  figmaURL={this.state.figmaURL} updateFigma={this.updateFigma}  mediaURL={this.state.mediaURL} updateMedia={this.updateMedia}/>      
        );
    }else{
        return (
            <RevisionsPageView  figmaURL={this.state.figmaURL} mediaURL={this.state.mediaURL} />      
>>>>>>> 56a5ed899c5775f76634bc9d54ec44514c16956c
        );
    }

  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(RevisionsPage);