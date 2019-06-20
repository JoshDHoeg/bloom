// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';

//IMPORT UTILITIES
// import { withFirebase } from '../../utilities/Firebase';
import { withAuthorization } from '../../utilities/Session';
import YoutubeEmbedVideo from "youtube-embed-video";
// import { format } from 'path';
// import {Link} from "react-router-dom";
import { Grid, Container, Header, Item } from 'semantic-ui-react';
import ProjCard from "../../components/ProjectCard.jsx"

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
        <Container fluid textAlign='center' text='true'>
            <Grid.Row style={{ paddingTop: '50px' }}>
              <Header style={{fontSize:'35px'}}>Welcome!</Header>
            </Grid.Row>
            <Grid.Row>
              <Item style={{paddingTop: '10px', fontSize: '25px'}}>
                Our platform provides an efficient and affordable way to obtain quality designs for an affordable price.
              </Item>
            </Grid.Row>
            <Grid.Row>
              <Item style={{paddingTop:'10px', fontSize: '15px'}}>
                We bring homeowners, designers, and landscapers to one platform for a convenient way to improve your yard.
              </Item>
            </Grid.Row>
            <Grid.Row>
              <YoutubeEmbedVideo videoId='e-wO-LqEQb4' suggestions={false} style={{ width: "600px", padding: "30px" }} />
            </Grid.Row>
        </Container>
        <Container>
            {loading && <div>Loading ...</div>}
            {this.userProjs.map((proj, index) => {
              return (<ProjCard proj={proj} key={proj.name} projectIndex={index} />);
            })}
        </Container>
      </Grid>
    );
  }
}


const condition = authUser => !!authUser;

export default withAuthorization(condition)(ProjectList);
