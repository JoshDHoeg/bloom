//BLOOMTIME DESIGN 2019
import React, { Component } from 'react';

//IMPORT UTILITIES
import backgroundTemp from '../../../../Images/TempBackground.PNG';
import { withAuthorization } from '../../../../utilities/Session';
import PreferencesBanner from '../../../../components/AccountBanners/AccountPreferencesBanner/AccountPreferenceBanner'
import TasteProfile from '../Components/TasteProfile/TasteProfile';
import Budget from '../Components/Budget/Budget';

class AccountPreferencesPageEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: true
        }
    }


    render() {
        return ( 
             <div style = {{ backgroundImage: "url(" + backgroundTemp + ")", backgroundRepeat: 'repeat', marginLeft: "-14px", paddingleft: "14px"}}>
                <div className="ui stackable grid container">
                    <PreferencesBanner edit={this.state.edit} user={this.props.user}/>    
                    <div className="row">
                        <span style={{ backGroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                            <h1 style={{ backgroundColor: "#2F2FED", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Edit Taste Profile</h1>
                             <TasteProfile edit={this.state.edit}/>
                             <Budget edit={this.state.edit} budget={this.state.budget}/>
                        </span>  
                    </div>
                </div>
            </div>
        );
    }

}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPreferencesPageEdit);