// BLOOMTIME DESIGN 2019
import React from 'react';

const DetailList = (props) => (
    <div>
        {props.edit ? (
            <DetailListEdit budget={props.budget} location={props.location} googleMaps={props.googleMaps} updateBudget={props.updateBudget} updateAddress={props.updateAddress} updateGoogleMaps={props.updateGoogleMaps}/>
        ) : (
                <DetailListView budget={props.budget} location={props.location} googleMaps={props.googleMaps}/>
            )}
    </div>
);

const DetailListView = (props) => {
    return (
        <div>
            <li id="LocationDisplay">Located on the {props.location}<br />See it on <a target="_blank" rel="noopener noreferrer" href={props.GoogleMapsURL}>Google Maps</a></li>
            <li id='BudgetDisplay'>Budget: {props.budget}</li>
        </div>
    )
}

const DetailListEdit = (props) => {
    return (
        <div>
            <ul>
                <li id="LocationEdit">Located on the <input type="text" id="LocationEditTxt" value={props.address} style={{ width: '140px' }} onChange={props.updateAddress}/><br />See it on <a href={props.googleMaps}>Google Maps</a></li>
                <br></br> {/*Temp break until the gap is styled with css*/}
                <li id="BudgetEdit" >Budget: <input type="text" id="BudgetEditTxt" value={props.budget} style={{ width: '140px' }} onChange={props.updateBudget}/></li>
            </ul>
        </div>
    )
}

export default DetailList;