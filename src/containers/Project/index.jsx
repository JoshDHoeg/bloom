// BLOOMTIME DESIGN 2019
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'

//IMPROT UTILITIES
import { withAuthorization } from '../../utilities/Session';
import * as ROUTES from "../../utilities/constants/routes";

import backgroundTemp from '../../Images/TempBackground.PNG';

//IMPORT CONTAINERS
import ConceptPage from './Concept';
import BriefPage from './Brief';
import FinalPage from './Final';
import RevisionsPage from './Revisions';

const HomePageWithSideBar = () => (
    <div style={{ backgroundImage: "url(" + backgroundTemp + ")", backgroundRepeat: 'repeat' }}>
        <Sidebar.Pushable as={Segment} style={{ marginTop: "-9px", marginLeft: '-3px', minHeight: "290px" }}>
            <Router>
                <div>
                    <Sidebar as={Menu} icon='labeled' vertical visible width='thin'>
                        <Menu.Item as={Link} to={ROUTES.CLIENT_BRIEF}>
                            <div style={{paddingTop: "10px", paddingBottom: "10px"}}>
                                <Icon name='clipboard' />
                                DBrief
                            </div>
                        </Menu.Item>
                        <Menu.Item as={Link} to={ROUTES.CLIENT_CONCEPT}>
                        <div style={{paddingTop: "10px", paddingBottom: "10px"}}>
                            <Icon name='bullseye' />
                            Concept
                            </div>
            </Menu.Item>
                        <Menu.Item as={Link} to={ROUTES.CLIENT_FINAL}>
                        <div style={{paddingTop: "10px", paddingBottom: "10px"}}>
                            <Icon name='file' />
                            Final
                            </div>
            </Menu.Item>
                        <Menu.Item as={Link} to={ROUTES.CLIENT_REVISIONS}>
                        <div style={{paddingTop: "10px", paddingBottom: "10px"}}>
                            <Icon name='folder' />
                            Revisions
                            </div>
            </Menu.Item>
                    </Sidebar>

                    <Sidebar.Pusher>
                        <Segment basic>

                            <div>
                                <Route path={ROUTES.CLIENT_CONCEPT} component={ConceptPage} />
                                <Route path={ROUTES.CLIENT_BRIEF} component={BriefPage} />
                                <Route path={ROUTES.CLIENT_REVISIONS} component={RevisionsPage} />
                                <Route path={ROUTES.CLIENT_FINAL} component={FinalPage} />
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
