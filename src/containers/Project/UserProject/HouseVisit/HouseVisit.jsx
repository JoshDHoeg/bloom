import React, {Component} from 'react'
import {Container, Grid, Item, Header, Segment, Button } from 'semantic-ui-react'
import { withAuthorization } from '../../../../utilities/Session';
import { Link } from 'react-router-dom';
import * as ROUTES from "../../../../utilities/constants/routes";

class HouseVisit extends Component {
    constructor(props) {
        super(props);
        this.state={
            stage:{
                stage: ''
            },
        }
    }

    componentDidMount() {
        this.setState({ loading: true, edit: this.props.edit });
        this.getProjectState();
        }

    getProjectState = async () => {
        const project = await this.props.firebase.doGetProject(this.props.firebase.user.uid, this.props.firebase.activeProject, true);
        this.stage = await project.stage;
        const state = await {
            loading: false,
            stage: {
                stage: this.stage.stage,
                rcount: this.stage.rcount
            },
        }
        this.setState(state);
        return state;
    }

    render(){
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
        return (
            <Grid>
                <Container textAlign='center'>
                    <Grid.Row>
                            <Header style={{fontSize:'25px', paddingTop:'50px'}}>Book A House Visit!</Header>
                    </Grid.Row>
                    <Grid.Row>
                            <Item style={{paddingTop:'10px'}}>Schedule a house visit to get started with your project</Item>
                    </Grid.Row>
                    <Grid.Row style={{paddingTop:'15px'}}>
                        <Segment style={{display:'block', margin:'auto', width:500, height:550,}}>
                            <iframe src="https://app.acuityscheduling.com/schedule.php?owner=17045777&appointmentType=8853671" width="100%" height="500" frameBorder="0"></iframe>
                            <script src="https://embed.acuityscheduling.com/js/embed.js" type="text/javascript"></script>
                        </Segment>
                    </Grid.Row>
                    <Grid.Row style={{paddingTop:'15px'}}>
                        {ProjectButton}
                    </Grid.Row>
                </Container>
            </Grid>
        )
    }
}

const condition = role => role > 0 && role !== 2;

export default withAuthorization(condition)(HouseVisit)