//BLOOMTIME DESIGN 2019
import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Container, Header } from 'semantic-ui-react';

//IMPROT UTILITIES
import { withAuthorization } from '../../../../utilities/Session';
import * as ROUTES from "../../../../utilities/constants/routes";
import backgroundTemp from '../../../../Images/TempBackground.PNG';
import WaitingPage from '../../../../components/Waiting/Waiting';
import Payment from '../Concept/Payment/Payment';
import CompletedPage from './Completed/Completed';
import Approve from './Approve/Approve'

export class Concept extends React.Component{
    concept;
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            completed: false,
            concept: {
                approved: false,
                approveterms: false,
                isPaid: false,
                video: null,
                schedule: null
            }
        }
        this.handleClick1 = this.handleClick1.bind(this);
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
    
      handleClick1 = () => {
        this.concept.approveterms = true;
        this.state.concept.approveterms = true;
        this.setState({complete: true})
    }

    getProjectState = async () => {
        const project = await this.props.firebase.doGetProject(this.props.firebase.user.uid, this.props.firebase.activeProject, true);
        this.concept = await project.concept;
        //const schedule = await this.project.concept.schedule;
        const state = await {
            loading: false,
            concept: {
                ...this.concept.getAll()
            }
        }

        this.setState(state);
        return state;
    }

    render(){
        console.log('Paid?', this.state.concept.isPaid)
        console.log('Approved?', this.state.concept.approved)
        console.log()
        console.log(this.state);
        if(this.state.loading){
            return (<div>Loading...</div>)
        }
        //change this to waiting component
        if(!this.state.concept.completed){
            return (<WaitingPage state="concept"/>)
        }

        //backgroundImage: "url(" + backgroundTemp + ")",
        //the one I'm doing
        if(this.state.concept.completed && !this.state.concept.approved) {
            return (<CompletedPage/>)
        }
        if(this.state.concept.completed && this.state.concept.approved && this.state.concept.approveterms && !this.state.concept.isPaid){
            return (<Payment/>)
        }
        if(this.state.concept.completed && this.state.concept.approved && !this.state.concept.isPaid && !this.state.concept.approveterms){
            return (<Approve handleClick1={this.handleClick1} concept={this.state.concept}/>)
        }
        if(this.state.concept.completed && this.state.concept.approved) {
            return (<CompletedPage/>)
        }
    }
}

const condition = role => role > 0;
export default withAuthorization(condition)(Concept);
