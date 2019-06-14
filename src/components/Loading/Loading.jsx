import Spinner from 'react-spinner-material';
import React, {Component} from 'react'
import { withAuthorization } from '../../utilities/Session';

class Loading extends Component {
render(){
    return (
        <div style={{marginTop: '20px', alignContent: 'center'}}>
            <Spinner size={120} spinnerColor={'#333'} spinnerWidth={2} visible={true} />
        </div>
    )
}

}

const condition = role => role > 0;

export default withAuthorization(condition)(Loading);