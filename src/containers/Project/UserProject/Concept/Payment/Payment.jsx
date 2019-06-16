import React, {Component} from 'react';
import ElementsContainer from '../../../../../components/PaymentStripe/frontend/ElementContainer'
import { withAuthorization } from '../../../../../utilities/Session';

class PaymentPage extends Component {
    render(){
        return(
            <ElementsContainer concept={this.props.concept}/>
        )
    }
}

const condition = role => role > 0;
    
export default withAuthorization(condition)(PaymentPage);
