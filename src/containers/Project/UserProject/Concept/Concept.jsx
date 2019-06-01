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

export class Concept extends React.Component{
    concept;
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            completed: false,
            concept: {
                approved: false,
                isPaid: false,
                video: null,
                schedule: null
            }
        }
       // this.completed = this.completed.bind(this)
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
        if(this.state.concept.completed && this.state.concept.approved && !this.state.concept.isPaid){
            return (<Payment/>)
        }

    }
}

const condition = role => role > 0;
export default withAuthorization(condition)(Concept);
