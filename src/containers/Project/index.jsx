// BLOOMTIME DESIGN 2019
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'

//IMPROT UTILITIES
import { withAuthorization } from '../../utilities/Session';
import * as ROUTES from "../../utilities/constants/routes";

import backgroundTemp from '../../Images/TempBackground.PNG';

//IMPORT CONTAINERS
import BriefPage from './Brief';
import ConceptPage from './Concept';
import FinalPage from './Final';
import RevisionsPage from './Revisions';
import BriefEditPage from './Brief/BriefEdit';
import ConceptEditPage from './Concept/ConceptEdit';
import FinalEditPage from './Final/FinalEdit';
import RevisionsEditPage from './Revisions/RevisionsEdit';

const HomePageWithSideBar = () => (
    <div style={{ backgroundImage: "url(" + backgroundTemp + ")", backgroundRepeat: 'repeat' }}>
        <Sidebar.Pushable as={Segment} style={{ marginTop: "-9px", marginLeft: '-3px', minHeight: "290px" }}>
            <Router>
                <div>
                    <Sidebar as={Menu} icon='labeled' vertical visible width='thin'>
                        {/*Gotta center this*/}
                        <div style={{ paddingLeft: "50px", paddingTop: "25px", paddingBottom: "30px" }}>
                            <img className="ui small circular image" src="https://react.semantic-ui.com/images/avatar/large/matthew.png" alt="" style={{ height: "55px", width: "55px" }} />
                        </div>

                        <Menu.Item as={Link} to={ROUTES.CLIENT_BRIEF}>
                            <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                                <Icon name='clipboard' />
                                DBrief
                            </div>
                        </Menu.Item>
                        <Menu.Item as={Link} to={ROUTES.CLIENT_CONCEPT}>
                            <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                                <Icon name='bullseye' />
                                Concept
                            </div>
                        </Menu.Item>
                        <Menu.Item as={Link} to={ROUTES.CLIENT_FINAL}>
                            <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                                <Icon name='file' />
                                Final
                            </div>
                        </Menu.Item>
                        <Menu.Item as={Link} to={ROUTES.CLIENT_REVISIONS}>
                            <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                                <Icon name='folder' />
                                Revisions
                            </div>
                        </Menu.Item>
                    </Sidebar>

                    <Sidebar.Pusher>
                        <Segment basic>

                            <div>
                                <Route exact path={ROUTES.PROJECT} component={BriefPage} />
                                <Route exact 
                                    path={ROUTES.CLIENT_BRIEF} 
                                    render={(props) => <BriefPage {...props} edit={false} /> }
                                    />
                                <Route exact path={ROUTES.CLIENT_CONCEPT} component={ConceptPage} />
                                <Route exact path={ROUTES.CLIENT_REVISIONS} component={RevisionsPage} />
                                <Route exact path={ROUTES.CLIENT_FINAL} component={FinalPage} />
                                <Route 
                                    path={ROUTES.CLIENT_BRIEF_EDIT} 
                                    render={(props) => <BriefPage {...props} edit={true} /> }
                                    /> 
                                <Route path={ROUTES.CLIENT_CONCEPT_EDIT} component={ConceptEditPage} />
                                <Route path={ROUTES.CLIENT_REVISIONS_EDIT} component={RevisionsEditPage} />
                                <Route path={ROUTES.CLIENT_FINAL_EDIT} component={FinalEditPage} />
                            </div>

                        </Segment>
                    </Sidebar.Pusher>
                </div>
            </Router>

        </Sidebar.Pushable>
    </div>
)

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePageWithSideBar);
