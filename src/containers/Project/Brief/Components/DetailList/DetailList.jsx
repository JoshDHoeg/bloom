// BLOOMTIME DESIGN 2019
import React from 'react';
<<<<<<< HEAD
import { Input, Form } from 'semantic-ui-react'
=======
import { Input, Container } from 'semantic-ui-react'
>>>>>>> 56a5ed899c5775f76634bc9d54ec44514c16956c

const DetailList = (props) => (
    <div>
        {props.edit ? (
<<<<<<< HEAD
            <DetailListEdit budget={props.budget} address={props.address} googleMaps={props.googleMaps} updateBudget={props.updateBudget} updateAddress={props.updateAddress} updateGoogleMaps={props.updateGoogleMaps}/>
        ) : (
                <DetailListView budget={props.budget} address={props.address} googleMaps={props.googleMaps}/>
=======
                <DetailListEdit budget={props.budget} address={props.address} handleChange={props.handleChange}/>
        ) : (
                <DetailListView budget={props.budget} address={props.address} />
>>>>>>> 56a5ed899c5775f76634bc9d54ec44514c16956c
            )}
    </div>
);

const DetailListView = (props) => {
    return (
<<<<<<< HEAD
        <div>
            <li id="LocationDisplay">Located on the {props.address}<br />See it on <a target="_blank" rel="noopener noreferrer" href={props.googleMaps}>Google Maps</a></li>
            <li id='BudgetDisplay'>Budget: {props.budget}</li>
        </div>
=======
        <Container>
            <div id="AddressDisplay">Located on the {props.address}<br /></div>
            <div id='BudgetDisplay'>Budget: {props.budget}</div>
        </Container>
>>>>>>> 56a5ed899c5775f76634bc9d54ec44514c16956c
    )
}

const DetailListEdit = (props) => {
    return (
<<<<<<< HEAD
        <Form>
            <label id="LocationEdit">Address </label>
            <Input value={props.address} onChange={props.updateAddress}/>
            <br />See it on 
            <a href={props.googleMaps}>Google Maps</a>
            <br></br> {/*Temp break until the gap is styled with css*/}
            <label id="BudgetEdit">Budget </label>
            <Input value={props.budget} onChange={props.updateBudget}/>
        </Form>
=======
        <Container>
            <label id="AddressEdit">Address </label>
            <Input name="address" value={props.address} onChange={props.handleChange}/>
            <br></br> {/*Temp break until the gap is styled with css*/}
            <label id="BudgetEdit">Budget </label>
            <Input name="budget" value={props.budget} onChange={props.handleChange}/>
        </Container>
>>>>>>> 56a5ed899c5775f76634bc9d54ec44514c16956c
    )
}

export default DetailList;