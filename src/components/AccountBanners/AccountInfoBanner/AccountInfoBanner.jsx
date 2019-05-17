//BLOOMTIME DESIGN 2019
import React from 'react';
//IMPORT UTILITIES
import { withAuthorization } from '../../../utilities/Session';
import EditButton from "./EditButton/EditButton";


const AccountBanner = (props) => (
    <div className="row" style={{ paddingTop: "40px "}}>
        <h2 className="ui header"><img className="ui circular image" alt="profile-icon" src="https://react.semantic-ui.com/images/avatar/large/matthew.png"/>
            {props.name}
        </h2>
        <EditButton edit={props.edit} formSubmit={props.formSubmit}/>
    </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountBanner);
