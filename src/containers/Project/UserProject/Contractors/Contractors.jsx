import React, {Component} from 'react'
import WaitingPage from '../../../../components/Waiting/Waiting';
import CompletedPage from './Completed/Completed';
import { withAuthorization } from '../../../../utilities/Session';
class ContractorPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            completed: true,
            quotes: [
                {name: "landscaper", 
                price: 2600,
                stars: 5},
                {name: "landscaper", 
                price: 2600,
                stars: 5},
                {name: "landscaper", 
                price: 2600,
                stars: 5}
            ],
            stage:{
                rcount: ''
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
    const state = await {
        loading: false,
        stage: {
            rcount: this.stage.rcount,
            stage: this.stage.stage
        },
    }

    this.setState(state);
    return state;
    }
    render(){
        if(!this.state.completed){
            return (
                <WaitingPage state="contractors"/>
            );
        }else{
            return (
                <CompletedPage stage={this.state.stage} quotes={this.state.quotes}/>
            );
        }
    }
}
const condition = role => role > 0;

export default withAuthorization(condition)(ContractorPage)