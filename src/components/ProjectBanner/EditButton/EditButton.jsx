// BLOOMTIME DESIGN 2019
import React from 'react';
import { withAuthorization } from '../../../utilities/Session';
import {Link} from "react-router-dom";
import * as ROUTES from "../../../utilities/constants/routes";

const EditButton = (props) => (
    props.edit ? (
        <button type="button" style={{ backgroundColor: "#27AE60", marginLeft: "225px", width: "100px", height: "40px", borderRadius: "4px", border: "#56CCF2", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.1)" }}><Link to={ROUTES.CLIENT_BRIEF} style={{ textDecoration: 'none', color: "white" }} >Done</Link></button>
    ) : (
        <button type="button" style={{ backgroundColor: "#27AE60", marginLeft: "225px", width: "100px", height: "40px", borderRadius: "4px", border: "#56CCF2", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.1)" }}><Link to={ROUTES.CLIENT_BRIEF_EDIT} style={{ textDecoration: 'none', color: "white" }} >Edit</Link></button>
    )
);

//this way gets the button to dissappear
// const condition = authUser =>
//   authUser && authUser._isDesigner;

//button is visible
const condition = role => role > 0

export default withAuthorization(condition)(EditButton);