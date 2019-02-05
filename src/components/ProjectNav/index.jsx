// BLOOMTIME DESIGN 2019
import React from 'react';

//React Router Import
import { BrowserRouter, Route, Link } from 'react-router-dom';
import * as ROUTES from '../../utilities/constants/routes';

//IMPROT UTILITIES
import { withAuthorization } from '../../utilities/Session';

import ProjectConceptPage from '../../containers/Project/Concept';
import ProjectRevisionsPage from '../../containers/Project/Revisions';
import ProjectFinalPage from '../../containers/Project/Final';
import ProjectBriefPage from '../../containers/Project/Brief';


const ProjectSteps = () => (
    <div>
        <div className="ui steps">
            <div className="step">
                <div className="content">
                    <div className="title"><Link to={ROUTES.CLIENT_CONCEPT}>Client Concept</Link></div>
                    <div className="description"></div>
                </div>
            </div>
            <div className="step">
                <div className="content">
                    <div className="title"><Link to={ROUTES.CLIENT_REVISIONS}>Client Revisions</Link></div>
                </div>
            </div>
            <div className="step">
                <div className="content">
                    <div className="title"><Link to={ROUTES.CLIENT_BRIEF}>Client Design Brief</Link></div>
                </div>
            </div>
            <div className="step">
                <div className="content">
                    <div className="title"><Link to={ROUTES.CLIENT_FINAL}>Client Final</Link></div>
                </div>
            </div>
        </div>
        <BrowserRouter>
            <div>
                <Route path={ROUTES.CLIENT_CONCEPT} component={ProjectConceptPage} />
                <Route path={ROUTES.CLIENT_REVISIONS} component={ProjectRevisionsPage} />
                <Route path={ROUTES.CLIENT_BRIEF} component={ProjectBriefPage} />
                <Route path={ROUTES.CLIENT_FINAL} component={ProjectFinalPage} />
            </div>
        </BrowserRouter>
    </div>
);
const condition = authUser => !!authUser;

export default withAuthorization(condition)(ProjectSteps);

