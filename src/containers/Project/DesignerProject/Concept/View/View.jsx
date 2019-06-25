// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//IMPROT UTILITIES
import { withAuthorization } from '../../../../../utilities/Session/index';
import * as ROUTES from "../../../../../utilities/constants/routes";
import { Grid, Container, Header, Button, Message} from 'semantic-ui-react'
//Youtube video and typeform imports
import YoutubeEmbedVideo from "youtube-embed-video";
import { ReactTypeformEmbed } from 'react-typeform-embed';

import backgroundTemp from '../../../../../Images/TempBackground.PNG';

import ConceptWaiting from './Waiting/Waiting';

class ConceptPageView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: false
        }
    }

    render() {
        // const Available = this.props.brief.available;
        console.log('video', this.props.concept.video)
        if (this.props.concept.completed){
            return (
                <Grid>
                    <Container fluid textAlign='center' text='true'>
                        <Grid.Row style={{paddingTop:'25px'}}>
                            <Header as='h1'>Concept Design</Header>
                        </Grid.Row>
                        <Grid.Row style={{paddingTop:'50px', paddingBottom:'20px'}}>
                            <Header as='h3'>Upload a video of your concepts for the user to choose from</Header>
                        </Grid.Row>
                        <Grid.Row style={{paddingBottom:'20px'}}>
                        <div style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                            <h1 style={{ backgroundColor: "#84DB95", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Video</h1>
                            <YoutubeEmbedVideo videoId={this.props.concept.video} suggestions={false} style={{ width: "600px", padding: "30px" }} />
                        </div>
                        </Grid.Row>
                        <Grid.Row style={{ paddingTop: '20px', paddingBottom: '50px'}}>
                        <Link to={ROUTES.CLIENT_CONCEPT_EDIT}
                        style={{textDecoration: 'none', color: "white"}}>
                            <Button style={{backgroundColor:'#FFCE6C'}}>
                                Edit
                            </Button>
                        </Link>
                        </Grid.Row>
                    </Container>
                </Grid>
            );
        }else{
            return (
                <ConceptWaiting isDesigner={this.props.isDesigner}/>
            );
        }

    }
}

const condition = role => role

export default withAuthorization(condition)(ConceptPageView);
