import React from 'react';
import { Grid, Container, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ProjectStatus from '../../../../../components/ProjectStatus/ProjectStatus';
import { withAuthorization } from '../../../../../utilities/Session';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight , faArrowLeft } from '@fortawesome/free-solid-svg-icons';
library.add(faArrowRight)
library.add(faArrowLeft)

class Completed extends React.Component{

    render(){
        console.log("here");

        return (
            <div>
                <Container><ProjectStatus state="concept"/></Container>
                <Grid style={{textAlign: "center", backgroundRepeat: 'repeat', marginLeft: "-14px", paddingLeft: "14px", paddingBottom: "100vh" }}>
                    <Container fluid style={{marginRight: "0px", marginLeft: "0px", borderRight: "0px", borderLeft: "0px", }}>
                        {/*<Link to="/projects/user_draft" style={{position: "absolute", right: "90%", top: "25%"}}>*/}
                            {/*<FontAwesomeIcon icon="arrow-left" size="5x" color="black"/>*/}
                        {/*</Link>*/}
                        <br/>
                        <Header as='h1'>Concept Designs</Header>
                        <Header as='h3'> Watch the video and pick your favorite concept to <br/> keep the project moving </Header>
                        <br/>
                        <br/>
                        <iframe width="560" height="275"
                                src="https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG"
                                align="middle"
                                frameBorder="20" allow="autoplay; encrypted-media" allowFullScreen
                        >
                        </iframe>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <iframe src="https://app.acuityscheduling.com/schedule.php?owner=17045777" width="560" height="450"
                                frameBorder="20">
                        </iframe>
                        <script src="./schedule.js" type="text/javascript"> </script>
                        <Link to="/project/user_draft" style={{position: "absolute", left: "90%", top: "250px"}}>
                            <FontAwesomeIcon icon="arrow-right" size="5x" color="black"/>
                        </Link>
                    </Container>
                </Grid>
            </div>
        )
    }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Completed);
