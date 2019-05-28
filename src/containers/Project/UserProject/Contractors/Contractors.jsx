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
            ]
        }
    }
    render(){
        if(!this.state.completed){
            return (
                <WaitingPage state="contractors"/>
            );
        }else{
            return (
                <CompletedPage quotes={this.state.quotes}/>
            );
        }
    }
}
const condition = authUser => !!authUser;

export default withAuthorization(condition)(ContractorPage)