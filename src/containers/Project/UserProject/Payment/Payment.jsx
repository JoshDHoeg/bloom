import React, {Component} from 'react';
import ElementsContainer from '../../../../components/PaymentStripe/frontend/ElementContainer'
import { withAuthorization } from '../../../../utilities/Session';
import { Grid } from 'semantic-ui-react';
import WaitingPage from '../../../../components/Waiting/Waiting';
import Loading from '../../../../components/Loading/Loading';

class PaymentPage extends Component {
    concept;
    stage;
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
            stage:{
                stage:''
            },
            user:{
                name:'',
                billadd1:''
            }
        }
    }

    componentDidMount() {
        this.setState({ loading: true, edit: this.props.edit });
        this.getProjectState();
      }


    getProjectState = async () => {
        const user = await this.props.firebase.doGetUser(this.props.firebase.user.uid);
        this.user = await user;
        const project = await this.props.firebase.doGetProject(this.props.firebase.user.uid, this.props.firebase.activeProject, true);
        this.stage = await project.stage;
        this.concept = await project.concept;
        //const schedule = await this.project.concept.schedule;
        const state = await {
            loading: false,
            stage: {
                stage: this.stage.stage,
                rcount: this.stage.rcount
            },
            concept:{
                ...this.concept.getAll()
            },
            user:{
                name: this.user.name,
                billadd1: this.user.billadd1
            }
        }
        this.setState(state);
        return state;
    }

    render(){
        if(this.state.loading){
            return (<div style={{marginTop:'30%'}}><Loading/></div>);
        }else if(this.state.concept.completed && this.state.concept.approved && this.state.concept.approveterms && !this.state.concept.isPaid){
        return(
            <Grid.Row>
                <ElementsContainer user={this.state.user} stage={this.state.stage} concept={this.state.concept}/>
            </Grid.Row>
        )
        }else{
            return(
            <WaitingPage stage={this.state.stage} state = 'payment'/>
            )
        }
    }
}

const condition = role => role > 0;
    
export default withAuthorization(condition)(PaymentPage);
