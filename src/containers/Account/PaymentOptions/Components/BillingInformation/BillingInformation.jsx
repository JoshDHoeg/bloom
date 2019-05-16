//BLOOMTIME DESIGN 2019
import React from 'react';

const BillingInfo = (props) => (
    <div>
        {props.edit ? (
            <BillingInfoEdit 
            billadd1={props.user.billadd1}  
            zip={props.user.zip}
            city={props.user.city}
            state={props.user.state}
            handleChange={props.handleChange}
            />
        ) : (
                <BillingInfoView 
                billadd1={props.user.billadd1}  
                zip={props.user.zip}
                city={props.user.city}
                state={props.user.state}  
                user={props.user}
                />
            )}
    </div>
);

const BillingInfoView = (props) => {
    const billadd1 = props.billadd1;
    const user = props.user;
    const zip = props.zip;
    const city = props.city;
    const state = props.state;
    console.log('user2', user)
    console.log('billadd1:', billadd1)
    return (
        <table class="ui definition table">
        <tbody>
            <h3>Billing Address:</h3>
            <tr>
                <td>Street Address:</td>
                <td>{billadd1}</td>
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
    const billadd1 = props.billadd1;
    const zip = props.zip;
    const city = props.city;
    const state = props.state;
    return(
        <table class="ui definition table">
        <tbody>
            <h3>Edit Billing Address:</h3>
            <tr>
                <td>Street Address:</td>
                <td id ='BillAddEdit'> <input type='text' id='BillAddEditTxt'  defaultValue={billadd1} style={{ width: '140px' }} ></input> </td>
            </tr>
            <tr>
                <td>Zip Code:</td>
                <td id ='ZipEdit'> <input type='text' id='ZipEditTxt'  defaultValue={zip} style={{ width: '140px' }} onChange={props.handleChange}></input></td>
            </tr>
            <tr>
                <td>City:</td>
                <td id ='CityEdit'> <input type='text' id='CityEditTxt'  defaultValue={city} style={{ width: '140px' }} onChange={props.handleChange}></input></td>
            </tr>
            <tr>
                <td>State:</td>
                <td id ='StateEdit'> <input type='text' id='StateEditTxt'  defaultValue={state} style={{ width: '140px' }} onChange={props.handleChange}></input></td>
            </tr>
        </tbody>
        </table>
    )
}

export default BillingInfo;