//BLOOMTIME DESIGN 2019
import React, {Component} from 'react';
import {Container, Grid, Segment } from 'semantic-ui-react'
//IMPORT UTILITES
import { withAuthorization } from '../../../../../utilities/Session';
import backgroundTemp from '../../../../../Images/TempBackground.PNG';
import InfoBanner from '../../../../../components/AccountBanners/AccountInfoBanner/AccountInfoBanner'
import UserInformation from '../Components/UserInformation/UserInformation';
import BillingInformation from '../Components/BillingInformation/BillingInformation';
import EditButton from '../../../../../components/AccountBanners/AccountInfoBanner/EditButton/EditButton';
import ChangePass from '../../../../Users/PasswordChange/PasswordChange';
import SignOutButton from '../../../../Users/SignOut/SignOut';

class AccountInfoPageView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false
        }
    }
    render() {
        return (
            <Container>
                <Grid columns='two' textAlign='center'>
                    <Grid.Row>
                        <InfoBanner 
                        user={this.props.user}
                        name={this.props.user.name}
                        />
                    </Grid.Row>
                    <Grid.Column>
                        <Segment>
                        <span style={{ backGroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                            <h1 style={{ backgroundColor: "#F5BDF9", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>User Information</h1>
                            <UserInformation 
                            edit={this.state.edit} 
                            user={this.props.user}
                            phone={this.props.user.phone}
                            name={this.props.user.name}
                            />
                        </span>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment>
                        <span style={{ backGroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                            <h1 style={{ backgroundColor: "#F5BDF9", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Address Information</h1>
                            <BillingInformation 
                            edit={this.state.edit}
                            billadd1={this.props.user.billadd1}
                            zip={this.props.user.zip}
                            state={this.props.user.state}
                            city={this.props.user.city}                            
                            />
                        </span>
                        </Segment>
                    </Grid.Column>
                    <Grid.Row style={{paddingBottom:'25px'}}>
                        <EditButton edit={this.state.edit} formSubmit={this.props.formSubmit}/>
                    </Grid.Row>
                    <Grid.Row style={{paddingBottom:'25px'}}>
                        <Segment>
                            <ChangePass/>
                        </Segment>
                    </Grid.Row>
                    <Grid.Row style={{paddingBottom:'50px'}}>
                        <SignOutButton/>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}

const condition = role => role > 0;

export default withAuthorization(condition)(AccountInfoPageView);
