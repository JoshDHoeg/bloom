// BLOOMTIME DESIGN 2019
import React from 'react';
//IMPROT UTILITIES
import { withAuthorization } from '../../../../../utilities/Session';
import { Container, Header, Button, Icon, Grid, Segment, Form, Message, GridColumn } from 'semantic-ui-react'
import * as ROUTES from "../../../../../utilities/constants/routes";
//Figma Embed import
import FigmaEmbed from 'react-figma-embed';
import { Link } from 'react-router-dom';
import ProjectStatus from '../../../../../components/ProjectStatus/ProjectStatus';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ArrowLeft from '../../../../../assets/images/icons/ArrowLeft.svg';
import ArrowRight from '../../../../../assets/images/icons/ArrowRight.svg';


library.add(faArrowRight);
library.add(faArrowLeft);

class Completed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            feedbackState: false,
            loading: false,
            revisions: false,
        }
        this.handleSuccess = this.handleSuccess.bind(this);
    }
    
    
    handleSuccess() {
        this.setState({
            feedbackState: true
        })
    }

    HandleClick = () => {
        this.setState({
            revisions: !this.state.revisions
        });
    }

    componentDidMount() {
        this.setState({ loading: true })
    }

    render() {
        let RightArrow;
        if(this.props.stage.stage === 'contractors'){
            RightArrow =                     
            <Link to="/project/user_contractors" style={{ position: "absolute", left: "90%", top: "250px" }}>
                <img src={ArrowRight} />
            </Link>
        }
        let LeftArrow;
        if(this.props.stage.stage === 'contractors' || this.props.stage.stage === 'revision2'){
            LeftArrow =
            <Link to="/project/user_revision/1" style={{ position: "absolute", right: "90%", top: "250px" }}>
                <img src={ArrowLeft} />
            </Link>
        }
        return (
            <Grid>
                <Container><ProjectStatus state="revision2"/></Container>
                <Container textAlign='center' text='true'>
                    {LeftArrow}
                    <Grid.Row style={{ paddingTop: '20px' }}>
                        <Header as='h2'>Revision 2</Header>
                    </Grid.Row>
                    <Grid.Row>
                    <p>We listened to your feedback and came up with a new version of your design based on what you said, let us know how we did!</p>
                    </Grid.Row>
                    <Grid.Row style={{ paddingTop: '20px' }}>
                        <Segment placeholder>
                            <span style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                                <h1 style={{ backgroundColor: "#27AE60", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>The Design</h1>
                                <FigmaEmbed url={this.props.revision.figma} style={{ width: "540px", margin: "30px" }} />
                            </span>
                        </Segment>
                    </Grid.Row>
                    <Grid.Row >
                        <Button.Group style={{ paddingTop: '20px', paddingBottom: '20px'}}>
                            <Button>Download Design</Button>
                            <Button ><Link onClick={this.props.formSubmit} to={ROUTES.CONTRACTORS} style={{ textDecoration: 'none', color: "black" }}>Hire Landscaper</Link></Button>
                        </Button.Group>
                    </Grid.Row>
                    {RightArrow}
                </Container>
            </Grid>

        )
    }
}

const condition = role => role > 0;

export default withAuthorization(condition)(Completed);
