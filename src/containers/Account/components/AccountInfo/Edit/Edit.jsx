//BLOOMTIME DESIGN 2019
import React, { Component } from 'react';
import {Container, Grid, Segment } from 'semantic-ui-react'
//IMPORT UTILITIES
import backgroundTemp from '../../../../../Images/TempBackground.PNG';
import { withAuthorization } from '../../../../../utilities/Session';
import InfoBanner from '../../../../../components/AccountBanners/AccountInfoBanner/AccountInfoBanner'
import UserInformation from '../Components/UserInformation/UserInformation';
import BillingInformation from '../Components/BillingInformation/BillingInformation';
import EditButton from '../../../../../components/AccountBanners/AccountInfoBanner/EditButton/EditButton'
import ChangePass from '../../../../Users/PasswordChange/PasswordChange'

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
            <Container>
                <Grid textAlign='center'>
                    <Grid.Row>
                        <InfoBanner
                        user={this.props.user}
                        name={this.props.user.name}
                        />
                    </Grid.Row>
                    <Grid.Row>
                        <Segment>
                        <span style={{ backGroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                            <h1 style={{ backgroundColor: "#F5BDF9", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Edit User Information</h1>
                            <UserInformation
                                name={this.props.user.name}
                                phone={this.props.user.phone}
                                billadd1={this.props.user.billadd1}
                                edit={this.state.edit}
                                handleChange={this.props.handleChange}
                                />                           
                        </span>
                        </Segment>
                    </Grid.Row>
                    <Grid.Row>
                        <Segment>
                        <span style={{ backGroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                            <h1 style={{ backgroundColor: "#F5BDF9", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Edit Address Information</h1>
                            <BillingInformation 
                            edit={this.state.edit}
                            billadd1={this.props.user.billadd1}
                            zip={this.props.user.zip}
                            state={this.props.user.state}
                            city={this.props.user.city} 
                            handleChange={this.props.handleChange}                           
                            />
                        </span>
                        </Segment>
                    </Grid.Row>
                    <Grid.Row style={{paddingBottom:'25px'}}>
                        <EditButton edit={this.state.edit} formSubmit={this.props.formSubmit}/>
                    </Grid.Row>
                    <Grid.Row style={{paddingBottom:'50px'}}>
                        <Segment>
                            <ChangePass/>
                        </Segment>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }

}

const condition = role => role > 0;

export default withAuthorization(condition)(AccountInfoPageEdit);
