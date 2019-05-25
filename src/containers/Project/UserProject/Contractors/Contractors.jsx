import React, {Component} from 'react'
import Waiting from '../../../../components/Waiting/Waiting';
import Completed from './Completed/Completed';
import { withAuthorization } from '../../../../utilities/Session';
class ContractorPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            isWaiting: false,
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
        if(this.state.isWaiting){
            return (
                <Waiting state="contractors"/>
            );
        }else{
            return (
                <Completed quotes={this.state.quotes}/>
            );
        }
    }
}
const condition = authUser => !!authUser;

export default withAuthorization(condition)(ContractorPage)