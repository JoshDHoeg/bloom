//BLOOMTIME DESIGN 2019
import React from 'react';
import { withAuthorization } from '../../../../utilities/Session';
import {Link} from "react-router-dom";
import * as ROUTES from "../../../../utilities/constants/routes";

const EditButton = (props) => (
    props.edit ? (
        <button type="button" style={{ backgroundColor: "#2F2FED", marginLeft: "225px", width: "100px", height: "40px", borderRadius: "4px", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.1)"}}><Link to={ROUTES.ACCOUNT_PREFERENCES} style={{ textDecoration: 'none', color: "white" }} >Done</Link></button>
    ) : (
        <button type="button" style={{ backgroundColor: "#2F2FED", marginLeft: "225px", width: "100px", height: "40px", borderRadius: "4px", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.1)"}}><Link to={ROUTES.ACCOUNT_PREFERENCES_EDIT} style={{ textDecoration: 'none', color: "white" }} >Edit</Link></button>
    )
);

const condition = authUser =>
    (authUser || authUser._isDesigner);

export default withAuthorization(condition)(EditButton);