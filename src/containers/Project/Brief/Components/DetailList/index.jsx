// BLOOMTIME DESIGN 2019
import React from 'react';

const DetailList = (props) => (
    <div>
        {props.edit ? (
            <DetailListEdit budget={props.brief.budget} location={props.location}/>
        ) : (
                <DetailListView location={props.location} budget={props.brief.budget}/>
            )}
    </div>
);

const DetailListView = (props) => {
    var GoogleMapsURL = "https://www.google.com/maps";
    const location = props.location;
    const budget = props.budget;
    return (
        <div>
            <li id="LocationDisplay">Located on the {location}<br />See it on <a target="_blank" rel="noopener noreferrer" href={GoogleMapsURL}>Google Maps</a></li>
            <li id='BudgetDisplay'>Budget: {budget}</li>
        </div>
    )
}

const DetailListEdit = (props) => {
    var GoogleMapsURL = "https://www.google.com/maps";
    const location = props.location;
    const budget = props.budget;
    return (
        <div>
            <ul>
                <li id="LocationEdit">Located on the <input type="text" id="LocationEditTxt" defaultValue={location} style={{ width: '140px' }}></input><br />See it on <a href={GoogleMapsURL}>Google Maps</a></li>
                <br></br> {/*Temp break until the gap is styled with css*/}
                <li id="BudgetEdit" >Budget: <input type="text" id="BudgetEditTxt" defaultValue={budget} style={{ width: '140px' }} ></input></li>
            </ul>
        </div>
    )
}

export default DetailList;