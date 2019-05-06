// BLOOMTIME DESIGN 2019
import React from 'react';
import { Input, Form } from 'semantic-ui-react'

const DetailList = (props) => (
    <div>
        {props.edit ? (
            <DetailListEdit budget={props.budget} address={props.address} googleMaps={props.googleMaps} updateBudget={props.updateBudget} updateAddress={props.updateAddress} updateGoogleMaps={props.updateGoogleMaps}/>
        ) : (
                <DetailListView budget={props.budget} address={props.address} googleMaps={props.googleMaps}/>
            )}
    </div>
);

const DetailListView = (props) => {
    return (
        <div>
            <li id="LocationDisplay">Located on the {props.address}<br />See it on <a target="_blank" rel="noopener noreferrer" href={props.googleMaps}>Google Maps</a></li>
            <li id='BudgetDisplay'>Budget: {props.budget}</li>
        </div>
    )
}

const DetailListEdit = (props) => {
    return (
        <Form>
            <label id="LocationEdit">Address </label>
            <Input value={props.address} onChange={props.updateAddress}/>
            <br />See it on 
            <a href={props.googleMaps}>Google Maps</a>
            <br></br> {/*Temp break until the gap is styled with css*/}
            <label id="BudgetEdit">Budget </label>
            <Input value={props.budget} onChange={props.updateBudget}/>
        </Form>
    )
}

export default DetailList;