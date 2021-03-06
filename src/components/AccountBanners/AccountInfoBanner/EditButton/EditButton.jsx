//BLOOMTIME DESIGN 2019
import React from 'react';
import { withAuthorization } from '../../../../utilities/Session';
import {Link} from "react-router-dom";
import * as ROUTES from "../../../../utilities/constants/routes";
import { Button } from 'semantic-ui-react';
import ReactToolTip from 'react-tooltip';

const EditButton = (props) => {
    if(props.edit) {

    }
    return (
        props.edit ? (
                <Link to={ROUTES.ACCOUNT_INFO} style={{textDecoration: 'none', color: "white"}}>
                <Button 
                data-tip='Click here to submit changes'
                onClick={props.formSubmit} 
                style={{
                    width: "100px",
                    height: "40px",
                    borderBottom:'3px solid',
                    borderColor: '#84DB95'
                }}>
                    Done
                <ReactToolTip />
                </Button>
            </Link>
        ) : (
            <Link to={ROUTES.ACCOUNT_INFO_EDIT} style={{textDecoration: 'none', color: "white"}}>
                <Button  
                data-tip='Click here to edit your information'
                style={{
                    width: "100px",
                    height: "40px",
                    borderBottom:'3px solid',
                    borderColor:'#FFCE6C',
                }}>
                        Edit
                <ReactToolTip />
                </Button>
            </Link>
        )
    );
}


const condition = role => role > 0;

export default withAuthorization(condition)(EditButton);
