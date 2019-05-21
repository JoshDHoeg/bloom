// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';
import { Card } from 'semantic-ui-react'

import ProjCard from "./../../components/ProjectCard.jsx"

//IMPORT UTILITIES

 export class Designer extends Component {
    constructor(projs){
        super(projs);
        this.state = {
            projects: projs
        };
    }
    componentDidMount(){}
    componentWillUnmount(){}
    render(){
        return(
            <Card.Group itemsPerRow={4}>
                {this.state.projects.props.map(proj => (
                    <ProjCard props={proj} key={proj.name}/>
                ))}
            </Card.Group>
        );
    }
}


