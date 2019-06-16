import React from 'react';
import './completed.scss';
import { Grid, Container, Header, GridColumn, Embed } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ProjectStatus from '../../../../../components/ProjectStatus/ProjectStatus';
import { withAuthorization } from '../../../../../utilities/Session';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ArrowRight from '../../../../../assets/images/icons/ArrowRight.svg';
import { faArrowRight , faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { GroupedObservable } from 'rxjs';
library.add(faArrowRight)
library.add(faArrowLeft)

class Completed extends React.Component{
    render(){
        return (
            <div className="ConceptCompleted">
                <Container><ProjectStatus state="concept"/></Container>
                <Grid className="ConceptGrid">
                    <Container fluid textAlign='center' text='true'>
                        {/*<Link to="/projects/user_draft" style={{position: "absolute", right: "90%", top: "25%"}}>*/}
                            {/*<FontAwesomeIcon icon="arrow-left" size="5x" color="black"/>*/}
                        {/*</Link>*/}
                    <Grid.Row>
                        <Header as='h1'>Concept Designs</Header>
                    </Grid.Row>
                    <Grid.Row>
                        <Header as='h3'> Watch the video and pick your favorite concept to <br/> keep the project moving </Header>
                    </Grid.Row>
                    <Grid.Row>
                    <Embed width="560" height="275"
                                src={this.props.concept.video}
                                align="middle"
                                frameBorder="20" allow="autoplay; encrypted-media" allowFullScreen
                        />
                    </Grid.Row>
                    <Grid.Row>
                    <iframe src="https://app.acuityscheduling.com/schedule.php?owner=17045777" width="60%" height="500" frameBorder="0"></iframe>
                        <script src="https://embed.acuityscheduling.com/js/embed.js" type="text/javascript"></script>
                    </Grid.Row>
                        <Link to="/project/user_draft" className="ConceptLink">
                            <img src={ArrowRight} />
                        </Link>
                    </Container>
                </Grid>
            </div>
        )
    }
}

const condition = role => role > 0;
export default withAuthorization(condition)(Completed);
