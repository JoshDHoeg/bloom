import React, {Component} from 'react'
import WaitingPage from '../../../../components/Waiting/Waiting';
import CompletedPage from './Completed/Completed';
import { withAuthorization } from '../../../../utilities/Session';
class ContractorPage extends Component {
    contractor;
    constructor(props){
        super(props);
        this.state = {
            completed: true,
            contractor: {
                contractor1: '',
                price1: 0,
                stars1: 0,
                number1: '',
                contractor2: '',
                price2: 0,
                stars2: 0,
                number2: '',
                contractor3: '', 
                price3: 0,
                stars3: 0,
                number3: ''
            },
            stage:{
                rcount: '',
                stage: ''
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
    this.contractor = await project.contractor;
    const state = await {
        loading: false,
        stage: {
            rcount: this.stage.rcount,
            stage: this.stage.stage
        },
        contractor: {
            ...this.contractor.getAll()
        }
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
                <CompletedPage contractor={this.state.contractor} stage={this.state.stage} quotes={this.state.quotes}/>
            );
        }
    }
}
const condition = role => role > 0 && role !== 2;

export default withAuthorization(condition)(ContractorPage)