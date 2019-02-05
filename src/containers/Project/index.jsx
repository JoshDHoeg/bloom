// BLOOMTIME DESIGN 2019
import React from 'react';

//IMPROT UTILITIES
import { withAuthorization } from '../../utilities/Session';

import ProjectSteps from '../../components/ProjectNav';

const HomePage = () => (
    <div>
        <ProjectSteps/>
        <h1>Home Page</h1>
        <p>The Home Page is accessible by every signed in user.</p>
        
    </div>
);
const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);

