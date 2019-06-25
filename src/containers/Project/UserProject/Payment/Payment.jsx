import React, {Component} from 'react';
import ElementsContainer from '../../../../components/PaymentStripe/frontend/ElementContainer'
import { withAuthorization } from '../../../../utilities/Session';
import { Grid } from 'semantic-ui-react';
import WaitingPage from '../../../../components/Waiting/Waiting';

class PaymentPage extends Component {
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
    }

    componentDidMount() {
        this.setState({ loading: true, edit: this.props.edit });
        this.getProjectState();
      }


    getProjectState = async () => {
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
            }
        }
        this.setState(state);
        return state;
    }

    render(){
        if(this.state.concept.completed && this.state.concept.approved && this.state.concept.approveterms && !this.state.concept.isPaid){
        return(
            <Grid.Row>
                <ElementsContainer stage={this.state.stage} concept={this.state.concept}/>
            </Grid.Row>
        )
        }else{
            return(
            <WaitingPage stage={this.state.stage} state = 'payment'/>
            )
        }
    }
}

const condition = role => role > 0 && role !== 2;
    
export default withAuthorization(condition)(PaymentPage);
