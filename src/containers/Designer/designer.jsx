// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';
import { Card, Icon, Image} from 'semantic-ui-react'
import {Link} from "react-router-dom";
import * as ROUTES from "../../utilities/constants/routes";
import ProjCard from "./../../components/ProjectCard.jsx"

//IMPORT UTILITIES
import { format } from 'path';

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


