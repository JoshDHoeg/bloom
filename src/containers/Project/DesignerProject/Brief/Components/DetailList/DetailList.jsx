// BLOOMTIME DESIGN 2019
import React from 'react';
import { Input, Container, Form, Item, Message } from 'semantic-ui-react';

const DetailList = (props) => (
    <div>
        {props.edit ? (
                <DetailListEdit budget={props.budget} address={props.address} handleChange={props.handleChange}/>
        ) : (
                <DetailListView budget={props.budget} address={props.address} />
            )}
    </div>
);

const DetailListView = (props) => {
    return (
        <Container>
            <Form style={{paddingLeft:'6px', paddingRight: '6px', paddingBottom:'6px'}}>
                <Item>Address:</Item>
                <Message
                    content={props.address}
                />
                <Item>Budget:</Item>
                <Message
                    content={props.budget}
                />
            </Form>
        </Container>
    )
}

const DetailListEdit = (props) => {
    return (
        <Container>
            <Form style={{paddingBottom:'10px'}}>
                <Item>Address:</Item>
                <Input value={props.address} onChange={props.handleChange}/>
                <Item>Budget:</Item>
                <Input value={props.budget} onChange={props.handleChange}/>
            </Form>
        </Container>
    )
}

export default DetailList;