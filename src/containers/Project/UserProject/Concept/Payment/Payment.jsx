import React, {Component} from 'react';
import ElementsContainer from '../../../../../components/PaymentStripe/frontend/ElementContainer'
import { withAuthorization } from '../../../../../utilities/Session';

class PaymentPage extends Component {
    render(){
        return(
            <ElementsContainer/>
        )
    }
}

const condition = authUser => !!authUser;
    
export default withAuthorization(condition)(PaymentPage);
