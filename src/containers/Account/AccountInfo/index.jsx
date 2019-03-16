// BLOOMTIME DESIGN 2019
import React from 'react'
import backgroundTemp from '../../../Images/TempBackground.PNG';
//IMPORT UTILITIESimport { getMaxListeners } from 'cluster';

import { withAuthorization } from '../../../utilities/Session';
import { withFirebase } from '../../../utilities/Firebase';
import user from '../../../utilities/Firebase/helpers/authUser'
//IMPORT CONTAINERS


const AccountInfo = () => (
    <div style={{ backgroundImage: "url(" + backgroundTemp + ")", backgroundRepeat: 'repeat', marginLeft: "-14px", paddingLeft: "14px" }}>
    <div className="ui stackable grid container">
        <div className="row" style={{ paddingTop: "40px" }}>
            <h2 class="ui header">
                <img className="ui circular image" src="https://react.semantic-ui.com/images/avatar/large/matthew.png"/>
                UserName
            </h2>
        </div>
        <div className="row">
                <span style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                    <h1 style={{ backgroundColor: "#4BED2F", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>User Information</h1>
                    <table class="ui definition table">
                    <tbody>
                        <tr>
                            <td>Username:</td>
                            <td> </td>
                            <td>Name of user</td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td> </td>
                            <td>blahblah@gmail.com</td>
                        </tr>
                        <tr>
                            <td>Street Address:</td>
                            <td> </td>
                            <td>#### Some Street</td>
                        </tr>
                        <tr>
                            <td>Zip Code:</td>
                            <td> </td>
                            <td>01234</td>
                        </tr>
                        <tr>
                            <td>City, State:</td>
                            <td> </td>
                            <td>Denver, Colorado</td>
                        </tr>
                    </tbody>
                    </table>
                </span>
        </div>
    </div>
    </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountInfo);
