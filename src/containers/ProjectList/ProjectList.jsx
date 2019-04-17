// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';

//IMPORT UTILITIES
// import { withFirebase } from '../../utilities/Firebase';
import { withAuthorization } from '../../utilities/Session';

// import { format } from 'path';
import {Link} from "react-router-dom";
import { Icon, Menu, Segment, Sidebar, Card } from 'semantic-ui-react'
import ProjCard from "../../components/ProjectCard.jsx"
import * as ROUTES from "../../utilities/constants/routes";

class ProjectList extends Component {
  userSub;
  projKeyArr;
  userProjs = [];

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      users: []

    };
    //assuming that user will always have _objects property...
    this.projKeyArr = this.props.firebase.user._projects.map(x => x.id);
    this.projKeyArr.forEach(p => this.props.firebase.doGetProject(p).then(res => this.userProjs.push(res)));
    //extract other relevant projec data here?
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.userSub = this.props.firebase.onUser().subscribe(users => {
      this.setState({
        users: users,
        loading: false
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.onUser(this.userSub);
  }

  render() {
    const { users, loading } = this.state;
    console.log(this.userProjs[0]);

    return (
        <Sidebar.Pushable as={Segment}>
            <Sidebar as={Menu} icon='labeled' vertical visible width='thin'>
                <Menu.Item as={Link} to={ROUTES.PROJECT}>
                    <Icon name='address book' />
                    Current Projects
                </Menu.Item>
            </Sidebar>

            <Sidebar.Pusher>
                <Segment basic>
                    <div>
                        <h1>Current Projects</h1>
                        {loading && <div>Loading ...</div>}
                        <Card.Group itemsPerRow={4}>
                            {this.userProjs.map(proj => (
                                <ProjCard props={proj} key={proj.name}/>
                            ))}
                        </Card.Group>
                    </div>
                </Segment>
            </Sidebar.Pusher>
        </Sidebar.Pushable>
    );
  }
}


const condition = authUser => !!authUser;

export default withAuthorization(condition)(ProjectList);
