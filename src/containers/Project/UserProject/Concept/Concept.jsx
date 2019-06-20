//BLOOMTIME DESIGN 2019
import React from 'react';
import './concept.scss';
import { Link } from 'react-router-dom';
import { Grid, Container, Header } from 'semantic-ui-react';

//IMPROT UTILITIES
import { withAuthorization } from '../../../../utilities/Session';
import * as ROUTES from "../../../../utilities/constants/routes";
import backgroundTemp from '../../../../Images/TempBackground.PNG';
import WaitingPage from '../../../../components/Waiting/Waiting';
import Payment from '../Payment/Payment';
import CompletedPage from './Completed/Completed';
import Approve from './Approve/Approve'
import Loading from '../../../../components/Loading/Loading'


export class Concept extends React.Component{
    concept;
    stage;
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
            },
            stage:{
                stage:''
            }
        }
        this.handleClick1 = this.handleClick1.bind(this);
    }

    componentDidMount() {
        this.setState({ loading: true, edit: this.props.edit });
        this.getProjectState();
      }
    
      handleClick1 = () => {
        this.concept.approveterms = true;
        this.state.concept.approveterms = true;
        this.setState({complete: true})
    }

    getProjectState = async () => {
        const project = await this.props.firebase.doGetProject(this.props.firebase.user.uid, this.props.firebase.activeProject, true);
        this.concept = await project.concept;
        this.stage = await project.stage;
        //const schedule = await this.project.concept.schedule;
        const state = await {
            loading: false,
            concept: {
                ...this.concept.getAll()
            },
            stage:{
                stage: this.stage.stage
            }
        }

        this.setState(state);
        return state;
    }

    render(){
        console.log('stage1', this.state.stage)
        // if(this.state.loading){
        //     return <Loading/>
        // }
        //change this to waiting component
        if(!this.state.concept.completed){
            return (<WaitingPage state="concept"/>)
        }

        //backgroundImage: "url(" + backgroundTemp + ")",
        //the one I'm doing
        if(this.state.concept.completed && !this.state.concept.approved) {
            return (<CompletedPage stage={this.state.stage} concept={this.state.concept} />)
        }
        if(this.state.concept.completed && this.state.concept.approved && !this.state.concept.isPaid && !this.state.concept.approveterms){
            return (<Approve handleClick1={this.handleClick1} concept={this.state.concept}/>)
        }
        if(this.state.concept.completed && this.state.concept.approved && this.state.concept.approveterms) {
            return (<CompletedPage stage={this.state.stage} concept={this.state.concept}/>)
        }
    }
}

const condition = role => role > 0;
export default withAuthorization(condition)(Concept);
