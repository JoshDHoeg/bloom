//BLOOMTIME DESIGN 2019
import React from 'react';
//IMPORT UTILITIES
import { withAuthorization } from '../../../utilities/Session';
import EditButton from "./EditButton";


const AccountBanner = (props) => (
    <div className="row" style={{ paddingTop: "40px "}}>
        <h2 className="ui header"><img className="ui circular image" src="https://react.semantic-ui.com/images/avatar/large/matthew.png"/>Elon{props.name}</h2> {/*used temporary Name until firebase has a value*/}
        <EditButton edit={props.edit} />
    </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountBanner);