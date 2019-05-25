import React, {Component} from 'react'
import Waiting from '../../../../components/Waiting/Waiting';
import { withAuthorization } from '../../../../utilities/Session';
class ContractorPage extends Component {
    render(){
        return(
            <Waiting />
        )
    }
}
const condition = authUser => !!authUser;

export default withAuthorization(condition)(ContractorPage)