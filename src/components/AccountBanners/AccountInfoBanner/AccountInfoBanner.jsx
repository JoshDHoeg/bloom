//BLOOMTIME DESIGN 2019
import React from 'react';
//IMPORT UTILITIES
import { withAuthorization } from '../../../utilities/Session';


const AccountBanner = (props) => (
    <div className="row" style={{ paddingTop: "40px ", textAlign:"center"}}>
        <h2 className="ui header"><img className="ui circular image" alt="profile-icon" src='https://react.semantic-ui.com/images/avatar/small/lindsay.png'/>
            {props.name}
        </h2>
    </div>
);

const condition = role => role > 0;

export default withAuthorization(condition)(AccountBanner);
