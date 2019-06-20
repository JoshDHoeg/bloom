import React, {Component} from 'react';
import ElementsContainer from '../../../../components/PaymentStripe/frontend/ElementContainer'
import { withAuthorization } from '../../../../utilities/Session';
import { Grid } from 'semantic-ui-react';

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
        console.log('stage3', this.props.stage)
        return(
            <Grid.Row>
                <ElementsContainer stage={this.state.stage} concept={this.state.concept}/>
            </Grid.Row>

        )
    }
}

const condition = role => role > 0;
    
export default withAuthorization(condition)(PaymentPage);
