// BLOOMTIME DESIGN 2019
import React from 'react'
import backgroundTemp from '../../../Images/TempBackground.PNG';
//IMPORT UTILITIES
import { withAuthorization } from '../../../utilities/Session';
//IMPORT CONTAINERS

const AccountInfo = () => (
    <div style={{ backgroundImage: "url(" + backgroundTemp + ")", backgroundRepeat: 'repeat', marginLeft: "-14px", paddingLeft: "14px" }}>
    <div className="ui stackable grid container">
        <div className="row" style={{ paddingTop: "40px" }}>
            <h1>Preferences</h1>
        </div>
        <div className="row" style={{padddingTop: "40px"}}>
            <span style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                <h1 style={{ backgroundColor: "#ED7B2F", color: "white", textAlign: "left", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Edit User Information</h1>
                <table class="ui definition table">
                    <tbody>
                        <tr>
                            <td>Username:</td>
                            <td>Name of user</td>
                            <td><button class="right attached ui button">edit</button></td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td>blahblah@gmail.com</td>
                            <td><button class="right attached ui button">edit</button></td>
                        </tr>
                        <tr>
                            <td>Street Address:</td>
                            <td>#### Some Street</td>
                            <td><button class="right attached ui button">edit</button></td>
                        </tr>
                        <tr>
                            <td>Zip Code:</td>
                            <td>1234</td>
                            <td><button class="right attached ui button">edit</button></td>
                        </tr>
                        <tr>
                            <td>City, State:</td>
                            <td>Denver, Colorado</td>
                            <td><button class="right attached ui button">edit</button></td>
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

