// BLOOMTIME DESIGN 2019
import React from 'react';
import { Input, Container } from 'semantic-ui-react'

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
            <div id="AddressDisplay">Located on the {props.address}<br /></div>
            <div id='BudgetDisplay'>Budget: {props.budget}</div>
        </Container>
    )
}

const DetailListEdit = (props) => {
    return (
        <Container>
            <label id="AddressEdit">Address </label>
            <Input name="address" value={props.address} onChange={props.handleChange}/>
            <br></br> {/*Temp break until the gap is styled with css*/}
            <label id="BudgetEdit">Budget </label>
            <Input name="budget" value={props.budget} onChange={props.handleChange}/>
        </Container>
    )
}

export default DetailList;