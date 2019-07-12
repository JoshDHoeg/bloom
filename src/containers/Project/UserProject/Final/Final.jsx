// BLOOMTIME DESIGN 2019
import React from 'react';
//IMPROT UTILITIES
import * as ROUTES from "../../../../utilities/constants/routes";
import { withAuthorization } from '../../../../utilities/Session'; //imports various possible pages that may be needed
import WaitingPage from '../../../../components/Waiting/Waiting';
import CompletedPage from './Completed/Completed.jsx';
import Payment from '../Payment/Payment';
import Loading from '../../../../components/Loading/Loading';


class Final extends React.Component { //final draft class
    final; //various possible stages
    stage;
    concept;
    revisions;
    user;
    constructor(props) {
        super(props);
        this.state = { //current state updated
            final: {
                completed: false, //final not completed yet
                figma: '', //empty figma link value
                feedback: '', //empty feedback value
                approved: false //not yet approved
            },
            stage: {
                stage: '', //empty stage value
                rcount: '' //empty revision count value
            },
            user:{
                name:''
            },
            concept: {
                approved: false, //concept not yet approved
                approveterms: false, //terms not yet approved
                isPaid: false, //payment not yet finished
                cost: '' //no cost determined yet
            },
            loading: false
        };
        this.formSubmit = this.formSubmit.bind(this); //bound functions with specified object
        this.handleChange = this.handleChange.bind(this);
        this.addRevision = this.addRevision.bind(this);
        this.mediaLink = this.mediaLink.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
    }

    
    formSubmit = () => { //when they submit the form
        this.final.approved = true; //confirms that final is approved
        let number = this.state.stage.rcount; //number is number of revisions so far
        let result = Number(number); //ensures value is in number format
        result = result+1; //updates number of revisions so far
        let result2 = String(result); //saves the revision number as a string
        this.state.stage.stage = 'revision'; //ensures project is in revision stage
        this.addRevision(); //creates new revision via firebase(?)
        this.stage.rcount = result2; //updates value of revision count with new total
        this.handleStateChange();
    }

    handleChange(event) {
        event.preventDefault(); //prevents default behaviour of an action(?)
        this.setState({ //updates state based on event
            final: {
                ...this.state.final,
                [event.target.name]: event.target.value, //sets the name as whatever value they input?
            }
        });
    }

    handleRedirect = () => {
        this.props.history.push(ROUTES.CONTRACTORS);
        this.stage.stage = 'contractors'
    }

    mediaLink() {
        window.open(
            this.state.final.media, //opens needed media link?
            '_blank')
    }

    blogLink() {
        window.open(
            'https://www.bloomtimedesign.co/bloomtime-blog/', //opens needed media link?
            '_blank')
    }

    handleStateChange = () => {
        this.setState({
            final: [], //empty array for final (once it is final, moves on to contractors per above)
            stage: [] //empty array for stage (since changing)
        })
        this.componentDidMount() //ensures component mounted without issue?
    }

    componentDidMount() {
        this.setState({ loading: true, edit: this.props.edit }); //sets loading as true and updates edit information
        this.getProjectState(); //determines project state
    }
    
    handleRedirect = () => {
        this.props.history.push(ROUTES.CONTRACTORS);
        this.stage.stage = 'contractors'
    }


    getProjectState = async () => { //determines the new project state
        const user = await this.props.firebase.doGetUser(this.props.firebase.user.uid)
        this.user = await user;
        const project = await this.props.firebase.doGetProject(this.props.firebase.user.uid, this.props.firebase.activeProject, true);
        this.final = await project.final; //is it in the final stage?
        this.stage = await project.stage; //updates stage value
        this.concept = await project.concept; //updates concept status
        const state = await {
            loading: false, //once loading is finished
            final: {
                ...this.final.getAll() //gets all information from final
            },
            stage: {
                stage: this.stage.stage, //stage value into object
                rcount: this.stage.rcount //revision count into object
            },
            concept:{
                ...this.concept.getAll() //all info from concept
            },
            user:{
                name: this.user.name
            }
        }
        this.setState(state); //updates and returns state
        return state;
    }

    addRevision(){ //when called, creates a new revision via firebase
        this.props.firebase.doCreateRevision(this.props.firebase.user.uid, this.state.stage.rcount, this.props.firebase.activeProject, true);
    }


    render(){
        if(this.state.loading){
            return (<div style={{marginTop:'30%'}}><Loading/></div>);
        }else if(this.state.concept.completed && this.state.concept.approved && this.state.concept.approveterms && !this.state.concept.isPaid && this.state.stage.stage === 'final'){
            return(<Payment/>)  //if everything has been completed but project has not been paid for, returns payment page     
        }else if(!this.state.final.completed){ //if final is not completed, stage stays at final and waiting page is called
            return(<WaitingPage stage={this.state.stage} state="final"/>)
        }else{ //otherwise show completed page
            return( <CompletedPage user={this.state.user} handleRedirect={this.handleRedirect} blogLink={this.blogLink} mediaLink={this.mediaLink} handleStateChange={this.handleStateChange} addRevision={this.addRevision} contractorStage={this.contractorStage} stage={this.state.stage} formSubmit={this.formSubmit} handleChange={this.handleChange} final={this.state.final}/> );
        }
    }
}

const condition = role => role > 0; //assuming user is verified (role>0) and not designer(role!==2), returns true

export default withAuthorization(condition)(Final); //authorizes if condition returns true, then exports