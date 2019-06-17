//BLOOMTIME DESIGN 2019
import React from 'react';
import { withAuthorization } from '../../../../utilities/Session';
import {Link} from "react-router-dom";
import * as ROUTES from "../../../../utilities/constants/routes";
import { Button } from 'semantic-ui-react';


const EditButton = (props) => {
    if(props.edit) {

    }
    return (
        props.edit ? (
                <Link to={ROUTES.ACCOUNT_INFO} style={{textDecoration: 'none', color: "white"}}>
                <Button onClick={props.formSubmit} style={{
                    width: "100px",
                    height: "40px",
                }}>
                    Done
                </Button>
            </Link>
        ) : (
            <Link to={ROUTES.ACCOUNT_INFO_EDIT} style={{textDecoration: 'none', color: "white"}}>
                <Button  style={{
                    width: "100px",
                    height: "40px",
                }}>
                        Edit
                </Button>`
            </Link>
        )
    );
}


const condition = role => role > 0;

export default withAuthorization(condition)(EditButton);
