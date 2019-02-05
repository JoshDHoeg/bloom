// BLOOMTIME DESIGN 2019
import React from 'react';

//React Router Import
import { BrowserRouter, Route, Link } from 'react-router-dom';
import * as ROUTES from '../../utilities/constants/routes';


//IMPROT UTILITIES
import { withAuthorization } from '../../utilities/Session';

import ProjectConceptPage from './Concept';
import ProjectRevisionsPage from './Revisions';
import ProjectFinalPage from './Final';
import ProjectBriefPage from './Brief';


const HomePage = () => (
    <div>
        <h1>Home Page</h1>
        <p>The Home Page is accessible by every signed in user.</p>
        <BrowserRouter>
            <div>
                <li>
                    <Link to={ROUTES.CLIENT_CONCEPT}>Client Concept</Link>
                </li>
                <li>
                    <Link to={ROUTES.CLIENT_REVISIONS}>Client Revisions</Link>
                </li>
                <li>
                    <Link to={ROUTES.CLIENT_BRIEF}>Client Design Brief</Link>
                </li>
                <li>
                    <Link to={ROUTES.CLIENT_FINAL}>Client Final</Link>

                </li>
               <Route path={ROUTES.CLIENT_CONCEPT} component={ProjectConceptPage} />
                <Route path={ROUTES.CLIENT_REVISIONS} component={ProjectRevisionsPage} />
                <Route path={ROUTES.CLIENT_BRIEF} component={ProjectBriefPage} />
                <Route path={ROUTES.CLIENT_FINAL} component={ProjectFinalPage} />
            </div>
        </BrowserRouter>
    </div>
);
const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);

