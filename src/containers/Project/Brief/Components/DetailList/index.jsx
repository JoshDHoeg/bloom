// BLOOMTIME DESIGN 2019
import React from 'react';

const DetailList = (props) => (
    <div>
        {props.edit ? (
        <DetailListEdit />
        ) : (
        <DetailListView />
        )}
    </div>
);

const DetailListView = (props) => {
    return (
        <div>this is the Detail view </div>
    )
}

const DetailListEdit = (props) => {
    var GoogleMapsURL = "https://www.google.com/maps";
    return (
        <div>
            <ul>
                <li id="LocationEdit">Located on the <input type="text" id="LocationEditTxt" defaultValue={props.location} style={{ width: '140px' }}></input><br />See it on <a href={GoogleMapsURL}>Google Maps</a></li>
                <br></br> {/*Temp break until the gap is styled with css*/}
                <li id="BudgetEdit" >Budget: <input type="text" id="BudgetEditTxt" defaultValue={props.budget} style={{ width: '140px' }} ></input></li>
            </ul>
        </div>
    )
}

export default DetailList;