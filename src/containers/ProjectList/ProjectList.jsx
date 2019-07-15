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
import { Grid, Container, Header, Item, Button, Segment, Image } from 'semantic-ui-react';
import ProjCard from "../../components/ProjectCard.jsx"
import PopMessage from "../Messaging/PopMessage"
import logo from '../../Images/TempLogo.JPG'
import Concept from '../Project/UserProject/Concept/Concept'; //concept page
import Contractors from '../Project/UserProject/Contractors/Contractors'; //contractors to show the user
import Final from '../Project/UserProject/Final/Final'; //final draft page
import Draft from '../Project/UserProject/Draft/Draft'; //rough draft page
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
      component:'',
      users: [],
      user: {
        isDesigner: false,
        active: false
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
                isDesigner: this.user.isDesigner,
                active: this.user.active
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
    let ProjectButton
    if(this.state.stage.stage === 'revision'){
        ProjectButton = 
        <Link to="/project/user_revision/0" >
            <Button>View Project</Button>
        </Link>
    }else{
        ProjectButton =
        <Link onClick={() => this.onClick(this.props.projectIndex)} to={{ pathname: ROUTES.PROJECT, state: {projectIndex: this.props.projectIndex}}} >
            <Button style={{backgroundColor:'#84DB95'}}>View Project</Button>
        </Link>
    }
    let Component
    if(this.state.stage.stage === "concept"){ //determines what stage project is in
      Component = Concept //if in concept stage updates component as such, etc.
    }else if(this.state.stage.stage === "draft"){
      Component = Draft
    }else if(this.state.stage.stage === 'final'){
      Component = Final
    // }else if(this.state.stage.stage === 'revision'){
    //         this.state.component = Revision
    }else if(this.state.stage.stage === 'contractors'){ //if user has a final version they are satisfied with, routes to contractor info
      Component = Contractors
    }else{ //if all of these have not been passed, then project is in revision stage, which is a form of a final draft
      Component = Final //therefore, sets component to Final so process does not move on to contractor prematurely
    }
    const { loading } = this.state;
    console.log(this.state.user.active);
    if(!this.state.user.active){
      return(
        <Grid columns='two' style={{position:'absolute', paddingBottom:'50px'}}>
          <Grid.Row style={{ display:'block', margin:'auto', textAlign:'left', paddingLeft:'10%', marginTop:'25px'}}>
            <Grid.Column>
              <Header as='h1'>
                Welcome to Bloomtime Design!
              </Header>
            </Grid.Column>
            <Grid.Column>
              <Image src={logo} alt="bloomtime-logo" style={{paddingRight:'10%', paddingLeft:'55%'}}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{textAlign:'center', marginTop:'25px', paddingLeft:'10%', paddingRight:'10%'}}>
            <Grid.Column>
              <Grid.Row>
              <Segment raised>
                  <Grid.Row>
                    <Header as='h2'>
                    Introductory Video
                    </Header>
                  </Grid.Row>
                  <Grid.Row>
                  <YoutubeEmbedVideo videoId='r_KnwwjcDXg' suggestions={false}  style={{ width: "100%", padding: "20px" }} />
                  </Grid.Row>
              </Segment>
              </Grid.Row>
              <Grid.Row style={{marginTop:'25px'}}>
                <Segment raised>
                  <Grid.Row style={{paddingTop:'10px'}}>
                  <Header as='h2'>
                    Demo Project
                  </Header>
                  </Grid.Row>
                  <Grid.Row style={{paddingTop:'10px'}}>
                  <Item>
                    Check out how we make landscaping easier through our demo project
                  </Item>
                  </Grid.Row>
                  <Grid.Row style={{paddingTop:'10px'}}>
                  {ProjectButton}
                  </Grid.Row>
                </Segment>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column>
            <Segment raised>
              <Grid.Row style={{paddingTop:'10px'}}>
              <Header as='h2'>
                Schedule a House Visit
              </Header>
              </Grid.Row>
              <Grid.Row style={{paddingTop:'10px'}}>
              <Item>
                In order to begin your project we need to discuss the your preferences and take custom measurements of your yard
              </Item>
              </Grid.Row>
              <Grid.Row style={{paddingTop:'10px'}}>
              <Segment style={{display:'block', margin:'auto', width:'100%', height:'100%'}}>
                <iframe src="https://app.acuityscheduling.com/schedule.php?owner=17045777&appointmentType=8853671" width="100%" height="435px" frameBorder="0"></iframe>
                <script src="https://embed.acuityscheduling.com/js/embed.js" type="text/javascript"></script>
              </Segment>
              </Grid.Row>
            </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
    }else if((this.state.user.active && !this.state.user.isDesigner) || (this.state.user.active === undefined && !this.state.user.isDesigner)) {
      return (
        <Grid style={{ height: "150vh", position: 'absolute', top: 70, left: 0, right: 0}}>
          <Component/>
        </Grid>
      );
    }else if(this.state.user.isDesigner){
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


const condition = role => role > 0;

export default withAuthorization(condition)(ProjectList);