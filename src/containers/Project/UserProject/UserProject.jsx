import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'

//IMPROT UTILITIES
import { withAuthorization } from '../../../utilities/Session';
import * as ROUTES from "../../../utilities/constants/routes";

import Concept from './Concept/Concept';
import Contractors from './Contractors/Contractors';
import Final from './Final/Final';
import Revision from './Revision/Revision';
import Draft from './Draft/Draft';


//concept => draft => final => revision => contractors
class UserProject extends React.Component {
    render(){
        return(
            <Router>
                <Segment basic>
                    <div>
                        <Route exact path={ROUTES.PROJECT} component={Concept}/>
                        <Route exact
                               path={ROUTES.CONCEPT}
                               render={(props) => <Concept {...props} edit={false} index={props.location.state} /> }
                        />
                        <Route exact
                               path={ROUTES.CONTRACTORS}
                               render={(props) => <Contractors {...props} edit={false} /> }
                        />
                        <Route exact
                               path={ROUTES.FINAL}
                               render={(props) => <Final {...props} edit={false} /> }
                        />
                        <Route exact
                               path={ROUTES.REVISION}
                               render={(props) => <Revision {...props} edit={false} /> }
                        />
                        <Route exact
                               path={ROUTES.DRAFT}
                               render={(props) => <Draft {...props} edit={false} /> }
                        />
                    </div>
                </Segment>
            </Router>
        )
    }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(UserProject);
