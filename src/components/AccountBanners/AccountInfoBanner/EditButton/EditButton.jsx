//BLOOMTIME DESIGN 2019
import React from 'react';
import { withAuthorization } from '../../../../utilities/Session';
import {Link} from "react-router-dom";
import * as ROUTES from "../../../../utilities/constants/routes";

const EditButton = (props) => {
    return (
        props.edit ? (
            <button onClick={props.formSubmit} type="button" style={{
                backgroundColor: "#4BED2F",
                width: "100px",
                height: "40px",
                borderRadius: "4px",
                boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.1)"
            }}>
                <Link to={ROUTES.ACCOUNT_INFO} style={{textDecoration: 'none', color: "white"}}>
                    Done
                </Link>
            </button>
        ) : (
            <button type="button" style={{
                backgroundColor: "#4BED2F",
                width: "100px",
                height: "40px",
                borderRadius: "4px",
                boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.1)"
            }}>
                <Link to={ROUTES.ACCOUNT_INFO_EDIT} style={{textDecoration: 'none', color: "white"}}>
                    Edit
                </Link>
            </button>
        )
    );
}


const condition = role => role > 0;

export default withAuthorization(condition)(EditButton);
