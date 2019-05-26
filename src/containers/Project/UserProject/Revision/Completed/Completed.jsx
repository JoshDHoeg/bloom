// BLOOMTIME DESIGN 2019
import React from 'react';
//IMPROT UTILITIES
import { withAuthorization } from '../../../../../utilities/Session';
import { Container, Header, Button, Icon, Segment, Form, Message } from 'semantic-ui-react'
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
            revision: false,
        }
    }
    HandleClick = () => {
        this.setState({
            revision: true
        });
    }

    render() {
        return (
            <div>
                <Container><ProjectStatus state="revision"/></Container>
                <Container textAlign='center' text='true'>
                    <Link to="/project/user_final" style={{ position: "absolute", right: "90%", top: "250px" }}>
                        <img src={ArrowLeft} />
                    </Link>
                    <Header as='h2'>Revision</Header>
                    <p>We listened to your feedback and came up with a new version of your design based on what you said, let us know how we did!</p>
                    <Segment placeholder>
                        <span style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                            <h1 style={{ backgroundColor: "#27AE60", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>The Design</h1>
                            <FigmaEmbed url={this.props.figma} style={{ width: "540px", margin: "30px" }} />
                        </span>
                    </Segment>
                    <Button.Group>
                        <Button>Download Design</Button>
                        <Button onClick={this.HandleClick} >Ask for Revision</Button>
                        <Button ><Link to={ROUTES.CONTRACTORS} style={{ textDecoration: 'none', color: "black" }}>Hire Landscaper</Link></Button>
                    </Button.Group>
                    <Message hidden={!this.state.revision} >
                        <Form className='revision'>
                            <Form.Input fluid label='REVISION' type='text' />
                            <Button color='blue'>Submit</Button>
                        </Form>
                    </Message>
                    <Link to="/project/user_contractors" style={{ position: "absolute", left: "90%", top: "250px" }}>
                        <img src={ArrowRight} />
                    </Link>
                </Container>
            </div>

        )
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Completed);
