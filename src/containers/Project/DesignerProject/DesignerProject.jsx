// BLOOMTIME DESIGN 2019
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'

//IMPROT UTILITIES
import { withAuthorization } from '../../../utilities/Session';
import * as ROUTES from "../../../utilities/constants/routes";

//IMPORT CONTAINERS
import BriefPage from './Brief/Brief';
import ConceptPage from './Concept/Concept';
import DraftPage from './Draft/Draft';
import FinalPage from './Final/Final';
import RevisionsPage from './Revisions/Revisions';


const HomePageWithSideBar = (props) => {
    return(
        <div style={{paddingTop:'8px' }}>
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
                            <Menu.Item as={Link} to={ROUTES.CLIENT_DRAFT}>
                                <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                                    <Icon name='file' />
                                    Draft
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
                                           render={(props) => <BriefPage {...props} edit={false} index={props.location.state} /> }
                                    />
                                    <Route exact
                                           path={ROUTES.CLIENT_CONCEPT}
                                           render={(props) => <ConceptPage {...props} edit={false} /> }
                                    />
                                    <Route exact
                                           path={ROUTES.CLIENT_DRAFT}
                                           render={(props) => <DraftPage {...props} edit={false} /> }
                                    />
                                    <Route exact
                                           path={ROUTES.CLIENT_FINAL}
                                           render={(props) => <FinalPage {...props} edit={false} /> }
                                    />
                                    <Route exact
                                           path={ROUTES.CLIENT_REVISIONS}
                                           render={(props) => <RevisionsPage {...props} edit={false} /> }
                                    />

                                    <Route
                                        path={ROUTES.CLIENT_BRIEF_EDIT}
                                        render={(props) => <BriefPage {...props} edit={true} index={props.location.state}/> }
                                    />
                                    <Route exact
                                           path={ROUTES.CLIENT_CONCEPT_EDIT}
                                           render={(props) => <ConceptPage {...props} edit={true} /> }
                                    />
                                    <Route exact
                                           path={ROUTES.CLIENT_DRAFT_EDIT}
                                           render={(props) => <DraftPage {...props} edit={true} /> }
                                    />
                                    <Route exact
                                           path={ROUTES.CLIENT_FINAL_EDIT}
                                           render={(props) => <FinalPage {...props} edit={true} /> }
                                    />
                                    <Route exact
                                           path={ROUTES.CLIENT_REVISIONS_EDIT}
                                           render={(props) => <RevisionsPage {...props} edit={true} /> }
                                    />
                                </div>
                            </Segment>
                        </Sidebar.Pusher>
                    </div>
                </Router>

            </Sidebar.Pushable>
        </div>
    )
}

const condition = role => role > 0;

export default withAuthorization(condition)(HomePageWithSideBar);
