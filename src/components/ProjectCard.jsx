import {Link} from "react-router-dom";
import React from 'react';
import { Card, Image} from 'semantic-ui-react'
import * as ROUTES from "../utilities/constants/routes";

//pic, name, loc, status
// const defaultPc = 'https://react.semantic-ui.com/images/avatar/large/molly.png';
const ProjCard = ({props})  => (
    <Card as={Link} to={ROUTES.PROJECT}>
        <Image src='https://react.semantic-ui.com/images/avatar/large/molly.png' />
        <Card.Content>
            <Card.Header>{props.clientRef.id}</Card.Header>
            <Card.Meta>
                <span className='date'>{props.name}</span>
            </Card.Meta>
            <Card.Description> {props.name} </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <Link to={ROUTES.PROJECT}>Project</Link>
        </Card.Content>
    </Card>
);

export default ProjCard;
