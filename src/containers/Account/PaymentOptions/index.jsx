// BLOOMTIME DESIGN 2019
import React from 'react'
import backgroundTemp from '../../../Images/TempBackground.PNG';
//IMPORT UTILITIES
import { withAuthorization } from '../../../utilities/Session';
//IMPORT CONTAINERS
import SignOutButton from '../../Users/SignOut';

const AccountInfo = () => (
    <div style={{ backgroundImage: "url(" + backgroundTemp + ")", backgroundRepeat: 'repeat', marginLeft: "-14px", paddingLeft: "14px" }}>
    <div className="ui stackable grid container">
        <div className="row" style={{ paddingTop: "40px" }}>
            <h1>Payment Options</h1>
        </div>
        <div className="row" style={{padddingTop: "40px"}}>
            <span style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                <h1 style={{ backgroundColor: "#2FEDE9", color: "white", textAlign: "left", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Edit Payment Method</h1>
                <table class="ui definition table">
                    <tbody>
                        <h3>Card Information:</h3>
                        <tr>
                            <td>Card Type:</td>
                            <td>City Bank</td>
                            <td><button class="right attached ui button">edit</button></td>
                        </tr>
                        <tr>
                            <td>Card Number:</td>
                            <td>5191 - **** - **** - ****</td>
                            <td><button class="right attached ui button">edit</button></td>
                        </tr>
                        <tr>
                            <td>Expiration Date:</td>
                            <td>02/**</td>
                            <td><button class="right attached ui button">edit</button></td>
                        </tr>
                        <tr>
                            <td>CVC:</td>
                            <td>****</td>
                            <td><button class="right attached ui button">edit</button></td>
                        </tr>
                    </tbody>
                </table>
                <table class="ui definition table">
                    <tbody>
                        <h3>Billing Address:</h3>
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
