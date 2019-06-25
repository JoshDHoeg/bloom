import React, {Component} from 'react';
import * as ROUTES from '../../utilities/constants/routes';
import { Icon, Menu, Sidebar, Segment, Sticky} from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {withAuthorization} from '../../utilities/Session';



class SidebarNav extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
            <div style={{zIndex: "1000000"}}>
                <Sticky>
                    <div>
                        <Sidebar as={Menu} icon='labeled' vertical visible width='thin' style={{ marginLeft: '-3px', minHeight: "290px" }}>
                            {/*Gotta center this*/}
                            <div style={{ paddingLeft: "50px", paddingTop: "75px", paddingBottom: "30px" }}>
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
                    </div>
            {/* </Sidebar> */}
            </Sticky>
        </div>


        )
    }

}

const condition = role => role > 1;
export default withAuthorization(condition)(SidebarNav);