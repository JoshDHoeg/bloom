// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

//IMPROT UTILITIES
import { withAuthorization } from '../../../../../utilities/Session';
// import * as ROUTES from "../../../utilities/constants/routes";

import backgroundTemp from '../../../../../Images/TempBackground.PNG';

import EditButton from '../../../../../components/ProjectBanner/EditButton/EditButton';

class RevisionsPageWaiting extends Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: false
        }
    }
    
    render() {
        if(this.props.isDesigner){
            if(!this.props.approved){
                return (
                    <div style={{textAlign: "center" ,backgroundImage: "url(" + backgroundTemp + ")", backgroundRepeat: 'repeat', marginLeft: "-14px", paddingLeft: "14px", paddingBottom: "100vh" }}>
                        <h1>The Final is not approved yet.</h1>
                    </div>
                )
            }else{
                return (
                    <div style={{textAlign: "center" ,backgroundImage: "url(" + backgroundTemp + ")", backgroundRepeat: 'repeat', marginLeft: "-14px", paddingLeft: "14px", paddingBottom: "100vh" }}>
                        <h1>The Design Concept Is not ready yet. You will receive a notification when it is ready.</h1>
                        <EditButton />
                    </div>
                );
            }
        }else{
            return (
                <div style={{textAlign: "center" , backgroundImage: "url(" + backgroundTemp + ")", backgroundRepeat: 'repeat', marginLeft: "-14px", paddingLeft: "14px", paddingBottom: "100vh" }}>
                    <div className="ui stackable grid container">
                        <div className="row">
                             <span style={{ width: "600px" }}>
                                <h1>Your Revisions are not done yet</h1>
                                <h2>We are always going to try to do everything we can to make sure you get something that is perfect. So</h2>
                                <h2>We will reach out to you as soon as the design brief is ready to go!</h2>
                            </span>
                        </div>
                    </div>
                </div>
            );
        }

    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(RevisionsPageWaiting);
