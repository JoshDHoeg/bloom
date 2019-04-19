// BLOOMTIME DESIGN 2019
import React from 'react';
import { Input, Form } from 'semantic-ui-react'

const DetailList = (props) => (
    <div>
        {props.edit ? (
                <DetailListEdit budget={props.budget} address={props.address} googleMaps={props.googleMaps} handleChange={props.handleChange}/>
        ) : (
                <DetailListView budget={props.budget} address={props.address} googleMaps={props.googleMaps}/>
            )}
    </div>
);

const DetailListView = (props) => {
    return (
        <div>
            <li id="AddressDisplay">Located on the <br />See it on <a target="_blank" rel="noopener noreferrer" href={props.googleMaps}>Google Maps</a></li>
            <li id='BudgetDisplay'>Budget: {props.budget}</li>
        </div>
    )
}

const DetailListEdit = (props) => {
    return (
        <Form>
            <label id="AddressEdit">Address </label>
            <Input name="address" value={props.address} onChange={props.handleChange}/>
            <br />See it on 
            <br></br> {/*Temp break until the gap is styled with css*/}
            <label id="BudgetEdit">Budget </label>
            <Input name="budget" value={props.budget} onChange={props.handleChange}/>
        </Form>
    )
}

export default DetailList;