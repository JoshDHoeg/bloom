import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Container, Header } from 'semantic-ui-react';

import { withAuthorization } from '../../../../../utilities/Session';

class Completed extends React.Component{
    render(){
        return (
            <div>
                <Grid style={{textAlign: "center", backgroundRepeat: 'repeat', marginLeft: "-14px", paddingLeft: "14px", paddingBottom: "100vh" }}>
                    <Container>
                        <br/>
                        <Header as='h1'>Concept Designs</Header>
                        <Header as='h3'> Watch the video and pick your favorite concept to <br/> keep the project moving </Header>
                        <br/>
                        <br/>
                        <iframe width="560" height="275"
                                src="https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG"
                                align="middle"
                                frameBorder="20" allow="autoplay; encrypted-media" allowFullScreen>
                        </iframe>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <iframe src="https://app.acuityscheduling.com/schedule.php?owner=17045777" width="560" height="450"
                                frameBorder="20">
                        </iframe>
                        <script src="./schedule.js" type="text/javascript"> </script>
                    </Container>
                </Grid>
            </div>
        )
    }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Completed);
