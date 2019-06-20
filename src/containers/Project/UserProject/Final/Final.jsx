// BLOOMTIME DESIGN 2019
import React from 'react';
//IMPROT UTILITIES
import { withAuthorization } from '../../../../utilities/Session';
import WaitingPage from '../../../../components/Waiting/Waiting';
import CompletedPage from './Completed/Completed.jsx';
import Payment from '../Payment/Payment'


class Final extends React.Component {
    final;
    stage;
    concept;
    revisions;
    constructor(props) {
        super(props);
        this.state = {
            final: {
                completed: false,
                figma: '',
                feedback: '',
                approved: false
            },
            stage: {
                stage: '',
                rcount: ''
            },
            concept: {
                approved: false,
                approveterms: false,
                isPaid: false,
            }
        };
        this.formSubmit = this.formSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addRevision = this.addRevision.bind(this);
        this.mediaLink = this.mediaLink.bind(this)
    }

    
    formSubmit = () => {
        let number = this.state.stage.rcount
        console.log('number', number)
        let result = Number(number)
        console.log('result', result)
        result = result+1;
        let result2 = String(result);
        console.log('result2', result2)
        this.final.feedback = this.state.final.feedback;
        this.final.approved = true;
        this.stage.stage = 'revision';
        this.addRevision();
        this.stage.rcount = result2;
        console.log(this.stage.rcount)
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({
            final: {
                ...this.state.final,
                [event.target.name]: event.target.value,
            }
        });
    }

    mediaLink() {
        window.open(
            this.state.final.media,
            '_blank')
    }

    handleStateChange = () => {
        console.log('working')
        this.setState({
            final: [],
            stage: []
        })
        this.componentDidMount()
    }

    componentDidMount() {
        this.setState({ loading: true, edit: this.props.edit });
        this.getProjectState();
      }


    getProjectState = async () => {
        const project = await this.props.firebase.doGetProject(this.props.firebase.user.uid, this.props.firebase.activeProject, true);
        this.final = await project.final;
        this.stage = await project.stage;
        this.concept = await project.concept;
        //const schedule = await this.project.concept.schedule;
        const state = await {
            loading: false,
            final: {
                ...this.final.getAll()
            },
            stage: {
                stage: this.stage.stage,
                rcount: this.stage.rcount
            },
            concept:{
                ...this.concept.getAll()
            }
        }
        this.setState(state);
        return state;
    }

    addRevision(){
        this.props.firebase.doCreateRevision(this.props.firebase.user.uid, this.state.final.feedback, this.state.stage.rcount, this.props.firebase.activeProject, true);
    }


    render(){
        console.log(this.stage)
        console.log('does this work',this.props.location.pathname);
        if(!this.state.final.completed){
            return( <WaitingPage stage={this.state.stage} state="final"/>    );             
        }else if(this.state.concept.completed && this.state.concept.approved && this.state.concept.approveterms && !this.state.concept.isPaid && this.props.stage.stage === 'draft'){
            return(<Payment/>)
        }else{
            return( <CompletedPage mediaLink={this.mediaLink} handleStateChange={this.handleStateChange} contractorStage={this.contractorStage} stage={this.state.stage} formSubmit={this.formSubmit} handleChange={this.handleChange} final={this.state.final}/> );
        }
    }
}

const condition = role => role > 0

export default withAuthorization(condition)(Final);