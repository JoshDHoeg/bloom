import {Link} from "react-router-dom";
import React from 'react';
import { Card, Icon, Image} from 'semantic-ui-react'
import * as ROUTES from "../utilities/constants/routes";

//pic, name, loc, status
const defaultPc = 'https://react.semantic-ui.com/images/avatar/large/molly.png';
const ProjCard = ({props})  => (
    <Card as={Link} to={ROUTES.CLIENTS}>
        <Image src='https://react.semantic-ui.com/images/avatar/large/molly.png' />
        <Card.Content>
            <Card.Header>{props.clientRef.id}</Card.Header>
            <Card.Meta>
                <span className='date'>{props.name}</span>
            </Card.Meta>
            <Card.Description> {props.name} </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <a href=" ">
                <Icon name='user' />
                {props.name}
            </a>
        </Card.Content>
    </Card>
);

export default ProjCard;
