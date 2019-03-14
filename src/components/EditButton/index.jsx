// BLOOMTIME DESIGN 2019
import React from 'react';
import { withAuthorization } from '../../utilities/Session';

const EditButton = () => (
    
    <button type="button" style={{ backgroundColor: "#27AE60", marginLeft: "260px", width: "100px", height: "40px", borderRadius: "4px", border: "#56CCF2", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.1)" }}><Link to={ROUTES.CLIENT_BRIEF_EDIT} style={{ textDecoration: 'none', color: "white" }} >Edit</Link></button>
);


const condition = authUser =>
  authUser && !authUser._isDesigner;

export default withAuthorization(condition)(AuthButton);