import React, {Component} from 'react';
import ElementsContainer from '../../../../../components/PaymentStripe/frontend/'

class PaymentPage extends Component {
    
    }
    const condition = authUser => !!authUser;
    
    export default injectStripe(PaymentButton);
    export default  withAuthorization(condition)(injectStripe(PaymentButton));