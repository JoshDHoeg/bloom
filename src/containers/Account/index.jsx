// BLOOMTIME DESIGN 2019
import React from 'react';

//IMPORT CONTAINERS
import { PasswordForgetForm } from '../Users/PasswordForget';
import PasswordChangeForm from '../Users/PasswordChange';

//IMPORT UTILITIES
import { AuthUserContext, withAuthorization } from '../../utilities/Session';
import {Link} from "react-router-dom";
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'
import * as ROUTES from "../../utilities/constants/routes";

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
        <div>
          <div>
            <h1>Account: {authUser.email}</h1>
            <PasswordForgetForm />
            <PasswordChangeForm />
          </div>
          <br/>
          <br/>
        </div>
    )}
  </AuthUserContext.Consumer>
);

const AccountPageWithSidebar = () => (
    <Sidebar.Pushable as={Segment}>
        <Sidebar as={Menu} icon='labeled' vertical visible width='thin'>
            <Menu.Item as={Link} to={ROUTES.CHANGE_PASS}>
                <Icon name='unlock' />
                Change Password
            </Menu.Item>
            <Menu.Item as={Link} to={ROUTES.ACCOUNT_INFO}>
                <Icon name='info circle' />
                Account Info
            </Menu.Item>
        </Sidebar>
        <Sidebar.Pusher>
            <Segment basic>
                <AccountPage/>
            </Segment>
        </Sidebar.Pusher>
    </Sidebar.Pushable>
)

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPageWithSidebar);
