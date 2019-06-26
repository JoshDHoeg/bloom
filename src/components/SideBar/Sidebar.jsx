import React, {Component} from 'react';
import * as ROUTES from '../../utilities/constants/routes';
import { Icon, Menu, Sidebar, Segment, Sticky, SidebarPushable} from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {withAuthorization} from '../../utilities/Session';



class SidebarNav extends Component {
    revisions = [];
    constructor(props){
        super(props);
        this.state={
            revisions: 1,
            loading: true
        }
    }

    componentDidMount() {
        this.getProjectState();
    }

    handleStateChange = () => {
        this.setState({
            revision: [],
        })
        this.componentDidMount()
    }

    getProjectState = async () => {
        const project = await this.props.firebase.doGetProject(this.props.firebase.user.uid, this.props.firebase.activeProject, true);
        this.stage = await project.stage;
        this.revisions = await project.revisions;
        //const schedule = await this.project.concept.schedule;
        const state = await {
            loading: false,
            stage: {
                stage: this.stage.stage
            }
        }
        this.setState(state);
        return state;
    }

    render() {
        console.log('hello', this.revisions)
        return(
            <div>
                <Sidebar as={Menu} icon='labeled' vertical visible width='thin' style={{ top:60, boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", zIndex:1, marginLeft: '-3px', minHeight: "290px" }}>
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
                    {this.revisions.map((item, i) => {
                        let number = Number(this.props.currentRevision);
                        var link = '/project/revisions/' + i;
                        return(<Menu.Item as={Link} onClick={this.props.handleStateChange} to={link}>
                        <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                            <Icon name='folder' />
                            Revision {i+1}
                        </div>
                        </Menu.Item>);})
                    }

                </Sidebar>
            </div>
        )
    }

}

const condition = role => role > 1;
export default withAuthorization(condition)(SidebarNav);