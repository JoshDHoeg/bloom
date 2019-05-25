import React, { Component } from 'react';
import waitingPage from '../../../../components/Waiting/Waiting';
import CompletedPage from './Completed/Completed.jsx';
import { withAuthorization } from '../../../../utilities/Session/index';


class Draft extends Component {
    constructor(props) {
        super(props);

        this.state = {
            waiting: false
        }
    }

    render() {
        if(this.state.waiting) {
            return(
                <div>
                    <waitingPage></waitingPage>
                </div>
            );
        } else {
        return(
            <div>
                <h1>test</h1>
                <CompletedPage/>
            </div>
        );}
    }

}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Draft);