//BLOOMTIME DESIGN 2019
import React from 'react';
import './concept.scss';

//IMPROT UTILITIES
import { withAuthorization } from '../../../../utilities/Session';
import WaitingPage from '../../../../components/Waiting/Waiting';
import CompletedPage from './Completed/Completed';
import Approve from './Approve/Approve';
import Loading from '../../../../components/Loading/Loading';



export class Concept extends React.Component{
    concept;
    stage;
    user;
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            completed: false,
            concept: {
                approved: false,
                approveterms: false,
                isPaid: false,
                video: null,
                schedule: null
            },
            user:{
                name:'',
                tour1: false
            },
            stage:{
                stage:''
            }
        }
        this.handleClick1 = this.handleClick1.bind(this);
        this.tour1 = this.tour1.bind(this);
    }

    componentDidMount() {
        this.setState({ loading: true, edit: this.props.edit });
        this.getProjectState();
      }

    tour1() {
        this.user.tour1 = true;
    }

    
      handleClick1 = () => {
        this.concept.approveterms = true;
        this.state.concept.approveterms = true;
        this.stage.stage = 'draft'
        this.setState({complete: true})
    }

    getProjectState = async () => {
        const user = await this.props.firebase.doGetUser(this.props.firebase.user.uid);
        this.user = await user;
        const project = await this.props.firebase.doGetProject(this.props.firebase.user.uid, this.props.firebase.activeProject, true);
        this.concept = await project.concept;
        this.stage = await project.stage;
        const state = await {
            loading: false,
            concept: {
                ...this.concept.getAll()
            },
            stage:{
                stage: this.stage.stage
            },
            user:{
                name: this.user.name,
                tour1: this.user.tour1
            }
        }

        this.setState(state);
        return state;
    }

    render(){
        console.log('api', process.env.API_KEY)
        if(this.state.loading){
            return (<div style={{marginTop:'30%'}}><Loading/></div>);
        }else if(!this.state.concept.completed){
            return (<WaitingPage stage={this.state.stage} state="concept"/>)
        }else if(this.state.concept.completed && !this.state.concept.approved) {
            return (<CompletedPage tour1={this.tour1} user={this.state.user} stage={this.state.stage} concept={this.state.concept} />)
        }else if(this.state.concept.completed && this.state.concept.approved && !this.state.concept.isPaid && !this.state.concept.approveterms){
            return (<Approve handleClick1={this.handleClick1} concept={this.state.concept}/>)
        }else if(this.state.concept.completed && this.state.concept.approved && this.state.concept.approveterms) {
            return (<CompletedPage tour1={this.tour1} user={this.state.user} stage={this.state.stage} concept={this.state.concept}/>)
        }
    }
}

const condition = role => role > 0 && role !== 2;
export default withAuthorization(condition)(Concept);
