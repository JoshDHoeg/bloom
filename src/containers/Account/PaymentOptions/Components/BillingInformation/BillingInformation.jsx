//BLOOMTIME DESIGN 2019
import React from 'react';

const BillingInfo = (props) => (
    <div>
        {props.edit ? (
            <BillingInfoEdit billadd={props.bill.add} zip={props.bill.zip} city={props.bill.city} state={props.bill.state}/>
        ) : (
                <BillingInfoView billadd={props.bill.add} zip={props.bill.zip} city={props.bill.city} state={props.bill.state}/>
            )}
    </div>
);

const BillingInfoView = (props) => {
    const billadd = props.billadd;
    const zip = props.zip;
    const city = props.city;
    const state = props.state;
    return (
        <table class="ui definition table">
        <tbody>
            <h3>Billing Address:</h3>
            <tr>
                <td>Street Address:</td>
                <td>{billadd}</td>
            </tr>
            <tr>
                <td>Zip Code:</td>
                <td>{zip}</td>
            </tr>
            <tr>
                <td>City:</td>
                <td>{city}</td>
            </tr>
            <tr>
                <td>State:</td>
                <td>{state}</td>
            </tr>
        </tbody>
        </table>
    )
}

const BillingInfoEdit = (props) => {
    const billadd = props.billadd;
    const zip = props.zip;
    const city = props.city;
    const state = props.state;
    return(
        <table class="ui definition table">
        <tbody>
            <h3>Edit Billing Address:</h3>
            <tr>
                <td>Street Address:</td>
                <td id ='BillAddEdit'> <input type='text' id='BillAddEditTxt' View ={billadd} style={{ width: '140px' }} ></input></td>
            </tr>
            <tr>
                <td>Zip Code:</td>
                <td id ='ZipEdit'> <input type='text' id='ZipEditTxt' View ={zip} style={{ width: '140px' }} ></input></td>
            </tr>
            <tr>
                <td>City:</td>
                <td id ='CityEdit'> <input type='text' id='CityEditTxt' View ={city} style={{ width: '140px' }} ></input></td>
            </tr>
            <tr>
                <td>State:</td>
                <td id ='StateEdit'> <input type='text' id='StateEditTxt' View ={state} style={{ width: '140px' }} ></input></td>
            </tr>
        </tbody>
        </table>
    )
}

export default BillingInfo;