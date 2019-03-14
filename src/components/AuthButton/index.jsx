// BLOOMTIME DESIGN 2019
import React from 'react';
import { withAuthorization } from '../../utilities/Session';

const AuthButton = () => (
    <div>
        This is the Auth Button
    </div>
);


const condition = authUser =>
  authUser && !authUser._isDesigner;

export default withAuthorization(condition)(AuthButton);