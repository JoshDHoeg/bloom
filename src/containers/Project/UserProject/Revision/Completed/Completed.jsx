// BLOOMTIME DESIGN 2019
import React from 'react';
//IMPROT UTILITIES
import { withAuthorization } from '../../../../../utilities/Session';
import { Container,Header, Button, Icon,Segment,Form,Message } from 'semantic-ui-react'
import * as ROUTES from "../../../../../utilities/constants/routes";
//Figma Embed import
import FigmaEmbed from 'react-figma-embed';
import { Link } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight , faArrowLeft } from '@fortawesome/free-solid-svg-icons';
library.add(faArrowRight);
library.add(faArrowLeft);

class Completed extends React.Component
{
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

    render(){
        return(
            <Container textAlign = 'center' text = 'true'>
            <Link to="/project/user_final" style={{position: "absolute", right: "90%", top: "250px"}}>
                <FontAwesomeIcon icon="arrow-left" size="5x" color="black"/>
            </Link>
            <Header as='h2'>Final Draft</Header>
            <p>
            Here is a final draft based on the feedback you gave us in the rough draft! Ask for a revision or get started with a landscaper!
            </p>
            <Segment placeholder>
            <span style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                <h1 style={{ backgroundColor: "#27AE60", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>The Design</h1>
                <FigmaEmbed url={this.props.figma} style={{ width: "540px", margin: "30px" }}/>
                 </span>
                 </Segment>
          <Button.Group>
          <Button>Download Design</Button>
         <Button onClick= {this.HandleClick} >Ask for Revision</Button>
         <Button ><Link to={ROUTES.CONTRACTORS}style={{textDecoration: 'none', color: "black"}}>Hire Landscaper</Link></Button>
         </Button.Group>
         <Message hidden = {!this.state.revision} >
         <Form className='revision'>
        <Form.Input fluid label='REVISION' type='text' />
          <Button color='blue'>Submit</Button>
    </Form>
           </Message>
            <Link to="/project/user_contractors" style={{position: "absolute", left: "90%", top: "250px"}}>
                <FontAwesomeIcon icon="arrow-right" size="5x" color="black"/>
            </Link>
          </Container>

        )
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Completed);
