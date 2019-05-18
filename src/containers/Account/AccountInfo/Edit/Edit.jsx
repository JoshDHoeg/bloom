//BLOOMTIME DESIGN 2019
import React, { Component } from 'react';

//IMPORT UTILITIES
import backgroundTemp from '../../../../Images/TempBackground.PNG';
import { withAuthorization } from '../../../../utilities/Session';
import InfoBanner from '../../../../components/AccountBanners/AccountInfoBanner/AccountInfoBanner'
import UserInformation from '../Components/UserInformation/UserInformation';

class AccountInfoPageEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: true
        }
    }

    //function to change parent state

    render() {
        return (
             <div style = {{ backgroundImage: "url(" + backgroundTemp + ")", backgroundRepeat: 'repeat', marginLeft: "-14px", paddingleft: "14px", paddingBottom: "100vh"}}>
                <div className="ui stackable grid container">
                    <InfoBanner
                        edit={this.state.edit}
                        user={this.props.user}
                        name={this.props.name}
                        formSubmit={this.props.formSubmit}
                    />
                    <div className="row">
                        <span style={{ backGroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                            <h1 style={{ backgroundColor: "#4BED2F", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Edit User Information</h1>
                             <UserInformation
                                name={this.props.name}
                                phone={this.props.phone}
                                edit={this.state.edit}
                                user={this.props.user}
                                handleChange={this.props.handleChange}
                             />
                        </span>
                    </div>
                </div>
            </div>
        );
    }

}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountInfoPageEdit);
