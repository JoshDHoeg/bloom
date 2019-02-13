// BLOOMTIME DESIGN 2019
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'

//IMPROT UTILITIES
import { withAuthorization } from '../../utilities/Session';
import * as ROUTES from "../../utilities/constants/routes";

//IMPORT CONTAINERS
import ConceptPage from './Concept';
import BriefPage from './Brief';
import FinalPage from './Final';
import RevisionsPage from './Revisions';

const HomePageWithSideBar = () => (
        <Sidebar.Pushable as={Segment} style={{ marginTop: "-9px", marginLeft: '-3px', minHeight: "290px" }}>
            <Router>
                <div>
                    <Sidebar as={Menu} icon='labeled' inverted vertical visible width='thin'>
                        <Menu.Item as={Link} to={ROUTES.CLIENT_BRIEF}>
                            <Icon name='clipboard' />
                            DBrief
            </Menu.Item>
                        <Menu.Item as={Link} to={ROUTES.CLIENT_CONCEPT}>
                            <Icon name='bullseye' />
                            Concept
            </Menu.Item>
                        <Menu.Item as={Link} to={ROUTES.CLIENT_FINAL}>
                            <Icon name='file' />
                            Final
            </Menu.Item>
                        <Menu.Item as={Link} to={ROUTES.CLIENT_REVISIONS}>
                            <Icon name='folder' />
                            Revisions
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
)

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePageWithSideBar);
