//BLOOMTIME DESIGN 2019
import React, { Component } from 'react';

//IMPORT UTILITIES
import backgroundTemp from '../../../../Images/TempBackground.PNG';
import { withAuthorization } from '../../../../utilities/Session';
import PaymentBanner from '../../../../components/AccountBanners/AccountPaymentBanner/AccountPaymentBanner'
import BillingInformation from '../Components/BillingInformation/BillingInformation'

class PaymentPageEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: true
        }
    }
    render() {
        return ( 
             <div style = {{ backgroundImage: "url(" + backgroundTemp + ")", backgroundRepeat: 'repeat', marginLeft: "-14px", paddingleft: "14px", paddingBottom: "100vh"}}>
                <div className="ui stackable grid container">
                    <PaymentBanner name={this.props.name} formSubmit={this.props.formSubmit} edit={this.state.edit} payment={this.props.payment}/>    
                    <div className="row">
                        <span style={{ backGroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                            <h1 style={{ backgroundColor: "#13F2F2", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Edit Payment Information</h1>
                             <BillingInformation 
                             edit={this.state.edit} 
                             billadd1={this.props.billadd1}
                             zip={this.props.zip}
                             city={this.props.city}
                             state={this.props.state}
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

export default withAuthorization(condition)(PaymentPageEdit);