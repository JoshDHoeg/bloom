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
<<<<<<< HEAD
        isPaid: false,
=======
        revision: {
          media:'',
          figma: '',
        }
>>>>>>> development
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
  
  SuccessPayment(){
//      this.setState({user:{...this.state.revisions, isPaid: true}});
      this.revision.isPaid = true
      console.log('database:');

    }

  getProjectState = async () => {
<<<<<<< HEAD
    const project = await this.props.firebase.doGetProject(this.props.firebase.user.uid, true);
    const revision = await project.revision;
=======
    const project = await this.props.firebase.doGetProject(this.props.firebase.user.uid, 0, true);
>>>>>>> development
    this.revision = await project.revision;
    const client = await project.client;
    const state = await {
        project: project,
        client: client,
        loading: false,
        revision: {
          ...this.revision.getAll()
        },
        figmaURL: this.revision.data.figmaURL,
        mediaURL: "https://drive.google.com/drive/folders/1H-aSlCfzkodqk8W7JWWv_z8L1GifTZR2?usp=sharing",
        isPaid: this.revision.isPaid,
    }

    this.setState(state);
    return state;
}

  render() {
    console.log('props:', this.props)
    console.log('isPaid:', this.isPaid)
    if(this.state.edit){
        return (
<<<<<<< HEAD
            <RevisionsPageEdit  SuccessPayment={this.SuccessPayment} figmaURL={this.state.figmaURL} updateFigma={this.updateFigma}  mediaURL={this.state.mediaURL} updateMedia={this.updateMedia}/>      
        );
    }else{
        return (
            <RevisionsPageView SuccessPayment={this.SuccessPayment} figmaURL={this.state.figmaURL} mediaURL={this.state.mediaURL} />      
=======
            <RevisionsPageEdit  figmaURL={this.state.figmaURL} updateFigma={this.updateFigma}  mediaURL={this.state.mediaURL} updateMedia={this.updateMedia}/>
        );
    }else{
        return (
            <RevisionsPageView  figmaURL={this.state.figmaURL} mediaURL={this.state.mediaURL} />
>>>>>>> development
        );
    }

  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(RevisionsPage);
