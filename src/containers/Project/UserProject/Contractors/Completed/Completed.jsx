import React, { Component } from 'react'
import { Grid, Divider, Segment, Button, Header, Container, Paragraph } from 'semantic-ui-react';
import { withAuthorization } from '../../../../../utilities/Session';
import ProjectStatus from '../../../../../components/ProjectStatus/ProjectStatus';
import { Link } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ArrowLeft from '../../../../../assets/images/icons/ArrowLeft.svg';
library.add(faArrowRight);
library.add(faArrowLeft);


class Completed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isWaiting: true,
            showNumber1: false,
            showNumber2: false,
            showNumber3: false
        };
        this.numberToggle1 = this.numberToggle1.bind(this);
        this.numberToggle2 = this.numberToggle2.bind(this);
        this.numberToggle3 = this.numberToggle3.bind(this);
    }


    numberToggle1() {
        this.setState({ showNumber1: !this.state.showNumber1 })
    }
    
    numberToggle2() {
        this.setState({ showNumber2: !this.state.showNumber2 })
    }

    numberToggle3() {
        this.setState({ showNumber3: !this.state.showNumber3 })
    }
    

    render() {
        let LeftArrow
        if(this.props.stage.rcount > 0){
            let revision = Number(this.props.stage.rcount)
            let link = "/project/user_revision/"+(revision-1);
            LeftArrow =
            <Link data-tip='go to revision' to={link} style={{ position: "absolute", right: "90%", top: "250px" }}>
                <img src={ArrowLeft} />
            </Link>
        }else{
            LeftArrow =
            <Link data-tip='go to final design' to="/project/user_final" style={{position: "absolute", right: "90%", top: "250px"}}>
                <img src={ArrowLeft} />
            </Link>
        }
    
        let contactPortion1; 
        if(this.state.showNumber1) {
            contactPortion1 =
            <div className="row">
                Phone Number: {this.props.contractor.number1}
            </div>;
        }
        let contactPortion2; 
        if(this.state.showNumber2) {
            contactPortion2 =
            <div className="row">
                Phone Number: {this.props.contractor.number2}
            </div>;
        }
        let contactPortion3; 
        if(this.state.showNumber3) {
            contactPortion3 =
            <div className="row">
                Phone Number: {this.props.contractor.number3}
            </div>;
        }
        console.log(this.props.contractor.number1)
        return (
            <div>
                <Container><ProjectStatus state="contractors" /></Container>
                <Grid style={{ textAlign: "center", backgroundRepeat: 'repeat', marginLeft: "-14px", paddingLeft: "14px", paddingBottom: "100vh" }}>

                    <Container fluid textAlign='center' text='true'>
                       {LeftArrow}
                        <Grid.Column width={3} />
                        <Grid.Column width={9}>
                            <Header style={{paddingTop:'20px'}}>Hey we found three quotes for you!</Header>
                            <Grid.Row>
                                <Header style={{ fontSize:'18px'}}>Landscaper 1</Header>
                            </Grid.Row>
                            <Grid.Row>
                                <Header style={{ fontSize:'15px'}}>Name: {this.props.contractor.contractor1}</Header>
                            </Grid.Row>
                            <Grid.Row>
                                <Header style={{ fontSize:'15px'}}>Stars: {this.props.contractor.stars1}</Header>
                            </Grid.Row>
                            <Grid.Row>
                                <Header style={{ fontSize:'15px'}}>Cost: ${this.props.contractor.price1}</Header>
                            </Grid.Row>
                            <Grid.Row>
                                <Button data-tip='Click here to see contact info' onClick={this.numberToggle1}>Contact</Button>
                            </Grid.Row>
                            <Grid.Row>
                                {contactPortion1}
                            </Grid.Row>
                        </Grid.Column>
                        <Grid.Column width={3} />
                        <Grid.Column width={9} style={{paddingTop:'20px'}}>
                            <Grid.Row>
                                <Header style={{ fontSize:'18px'}}>Landscaper 2</Header>
                            </Grid.Row>
                            <Grid.Row>
                                <Header style={{ fontSize:'15px'}}>Name: {this.props.contractor.contractor2}</Header>
                            </Grid.Row>
                            <Grid.Row>
                                <Header style={{ fontSize:'15px'}}>Stars: {this.props.contractor.stars2}</Header>
                            </Grid.Row>
                            <Grid.Row>
                                <Header style={{ fontSize:'15px'}}>Cost: ${this.props.contractor.price2}</Header>
                            </Grid.Row>
                            <Grid.Row>
                                <Button data-tip='Click here to see contact info' onClick={this.numberToggle2}>Contact</Button>
                            </Grid.Row>
                            <Grid.Row>
                                {contactPortion2}
                            </Grid.Row>
                        </Grid.Column>
                        <Grid.Column width={3} />
                        <Grid.Column width={9} style={{paddingTop:'20px'}}>
                            <Grid.Row>
                                <Header style={{ fontSize:'18px'}}>Landscaper 3</Header>
                            </Grid.Row>
                            <Grid.Row>
                                <Header style={{ fontSize:'15px'}}>Name: {this.props.contractor.contractor3}</Header>
                            </Grid.Row>
                            <Grid.Row>
                                <Header style={{ fontSize:'15px'}}>Stars: {this.props.contractor.stars3}</Header>
                            </Grid.Row>
                            <Grid.Row>
                                <Header style={{ fontSize:'15px'}}>Cost: ${this.props.contractor.price3}</Header>
                            </Grid.Row>
                            <Grid.Row>
                                <Button data-tip='Click here to see contact info' onClick={this.numberToggle3}>Contact</Button>
                            </Grid.Row>
                            <Grid.Row>
                                {contactPortion3}
                            </Grid.Row>
                        </Grid.Column>
                    </Container>
                </Grid>
            </div>
        );
    }
}
const condition = role => role > 0;

export default withAuthorization(condition)(Completed)
