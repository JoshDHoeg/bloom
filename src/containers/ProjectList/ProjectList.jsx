// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//IMPORT UTILITIES
// import { withFirebase } from '../../utilities/Firebase';
import { withAuthorization } from '../../utilities/Session';
import YoutubeEmbedVideo from "youtube-embed-video"; // video to display on page
import * as ROUTES from "../../utilities/constants/routes";
// import { format } from 'path';
// import {Link} from "react-router-dom";
import { Grid, Container, Header, Item, Button } from 'semantic-ui-react';
import ProjCard from "../../components/ProjectCard.jsx"
import PopMessage from "../Messaging/PopMessage"
import PricingTool from '../../components/PricingTool/pricingTool'

class ProjectList extends Component {
  userSub;
  draft;
  stage;
  brief;
  projKeyArr;
  userProjs = [];
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      users: [],
      user: {
        isDesigner: false
      },
      brief: {
        budget: ''
      },
      stage: {
        stage: ''
      }

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

    this.getUserState();
  }

  getUserState = async () => {
    const user = await this.props.firebase.doGetUser(this.props.firebase.user.uid);
        this.user = await user
        const state = await {
            loading: false,
            user: {
                isDesigner: this.user.isDesigner
            },
        }
        this.setState(state);
        if(!this.state.user.isDesigner){
            this.getProjectState();
        }
        return state;
  }

  getProjectState = async () => {
    const project = await this.props.firebase.doGetProject(this.props.firebase.user.uid, this.props.firebase.activeProject, true);
    this.brief = await project.brief;
    this.stage = await project.stage;
    const state = await {
        loading: false,
        brief:{
          ...this.brief.getAll()
        },
        stage: {
            stage: this.stage.stage,
            rcount: this.stage.rcount
        },

    }

    this.setState(state);
    return state;
}

  componentWillUnmount() {
    this.props.firebase.onUser(this.userSub);
  }

  render() {
    const { loading } = this.state;
    if(!this.state.user.isDesigner) {
      return (
        <Grid >
          <Container fluid textAlign='center' text='true' style={{paddingBottom:'30px'}}>
              <Grid.Row style={{ paddingTop: '50px' }}>
                <Header style={{fontSize:'35px'}}>Welcome!</Header>
              </Grid.Row>
              <Grid.Row  style={{display:'block', margin:'auto'}}>
                <YoutubeEmbedVideo videoId='RIswhklQTMc' suggestions={false} style={{ width: "600px", padding: "30px" }} />
              </Grid.Row>
              <Grid.Row  style={{paddingRight:'30px'}} textAlign='center'>
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
    }else{
        return(
          <Grid>
            <Container fluid textAlign='center' text='true' style={{paddingBottom:'30px'}}>
              <Grid.Row style={{ paddingTop:'65px'}}>
                <Header style={{fontSize:'35px'}}>Welcome!</Header>
              </Grid.Row>
              <Grid.Row>
                <Item style={{ paddingRight:'30px', paddingTop:'15px', fontSize:'20px'}}>Select a project to edit and view any of your active projects</Item>
                <Item style={{paddingRight:'30px', paddingTop:'10px', fontSize:'18px'}}>You may save entries by simply selecting the 
                  'Save' button. Once everything is ready, select 
                  'Publish to make the project viewable to the client</Item>
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
        )
    }
  }
}


const condition = authUser => !!authUser;

export default withAuthorization(condition)(ProjectList);
