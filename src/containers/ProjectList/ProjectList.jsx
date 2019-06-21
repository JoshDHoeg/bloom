// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
//IMPORT UTILITIES
// import { withFirebase } from '../../utilities/Firebase';
import { withAuthorization } from '../../utilities/Session';
import YoutubeEmbedVideo from "youtube-embed-video";
import * as ROUTES from "../../utilities/constants/routes";
// import { format } from 'path';
// import {Link} from "react-router-dom";
import { Grid, Container, Header, Item, Button } from 'semantic-ui-react';
import ProjCard from "../../components/ProjectCard.jsx"
import PopMessage from "../Messaging/PopMessage"

class ProjectList extends Component {
  userSub;
  draft;
  projKeyArr;
  userProjs = [];
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      users: [],
    };

    //assuming that user will always have _objects property...
    this.projKeyArr = this.props.firebase.user._projects.map(x => x.id);
    this.projKeyArr.forEach(p => this.props.firebase.doGetProject(p).then(res => {this.userProjs.push(res);}));
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
    const { loading } = this.state;
    return (
      <Grid >
        <Container fluid textAlign='center' text='true' style={{paddingBottom:'30px'}}>
            <Grid.Row style={{ paddingTop: '50px' }}>
              <Header style={{fontSize:'35px'}}>Welcome!</Header>
            </Grid.Row>
            <Grid.Row>
              <YoutubeEmbedVideo videoId='RIswhklQTMc' suggestions={false} style={{ width: "600px", padding: "30px" }} />
            </Grid.Row>
            <Grid.Row>
              <Item>Book a house visit to get started on a new project</Item>
              <Link to='/house_visit'>
                <Button size='huge' style={{backgroundColor:'#84DB95'}}>Start Your Project</Button>
              </Link>
            </Grid.Row>
        </Container>
        <Container>
            {loading && <div>Loading ...</div>}
            {this.userProjs.map((proj, index) => {
              return (<ProjCard proj={proj} key={proj.name} projectIndex={index} />);
            })}
        </Container>
        <PopMessage />
      </Grid>
      
    );
  }
}


const condition = authUser => !!authUser;

export default withAuthorization(condition)(ProjectList);
