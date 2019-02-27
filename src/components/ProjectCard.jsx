import {Link} from "react-router-dom";
import React, { Component } from 'react';
import { Card, Icon, Image} from 'semantic-ui-react'
import * as ROUTES from "../utilities/constants/routes";

//pic, name, loc, status
const ProjCard = ({props})  => (
    <Card as={Link} to={ROUTES.CLIENTS}>
        <Image src={props.pic} />
        <Card.Content>
            <Card.Header>{props.name}</Card.Header>
            <Card.Meta>
                <span className='date'>{props.loc}</span>
            </Card.Meta>
            <Card.Description> {props.status} </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <a>
                <Icon name='user' />
                {props.status}
            </a>
        </Card.Content>
    </Card>
);

export default ProjCard;
