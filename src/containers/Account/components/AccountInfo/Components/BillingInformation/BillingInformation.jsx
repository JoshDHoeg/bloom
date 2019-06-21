//BLOOMTIME DESIGN 2019
import React from 'react';
import { Input } from 'semantic-ui-react'
const BillingInfo = (props) => (
    <div>
        {props.edit ? (
            <BillingInfoEdit 
            billadd1={props.billadd1} 
            zip={props.zip} 
            city={props.city} 
            state={props.state}
            handleChange={props.handleChange}
            formSubmit={props.formSubmit}
            />
        ) : (
                <BillingInfoView 
                billadd1={props.billadd1} 
                zip={props.zip} 
                city={props.city} 
                state={props.state}/>
            )}
    </div>
);

const BillingInfoView = (props) => {
    const billadd1 = props.billadd1;
    const zip = props.zip;
    const city = props.city;
    const state = props.state;
    return (
        <div style={{textAlign:'center'}}>
        <table class="ui definition table">
        <tbody>
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
        </div>
    )
}

const BillingInfoEdit = (props) => {
    const billadd1 = props.billadd1;
    const zip = props.zip;
    const city = props.city;
    const state = props.state;
    const handleChange = props.handleChange;
    return(
        <table class="ui definition table">
        <tbody>
            <tr>
                <td>Street Address:</td>
                <td id ='BillAdd1Edit'> <Input type='text' name='billadd1' defaultValue={billadd1} onChange={handleChange} style={{ width: '140px' }} ></Input></td>
            </tr>
            <tr>
                <td>Zip Code:</td>
                <td id ='ZipEdit'> <Input type='text' name='zip' defaultValue={zip} onChange={handleChange} style={{ width: '140px' }} ></Input></td>
            </tr>
            <tr>
                <td>City:</td>
                <td id ='CityEdit'> <Input type='text' name='city' defaultValue={city} onChange={handleChange} style={{ width: '140px' }} ></Input></td>
            </tr>
            <tr>
                <td>State:</td>
                <td id ='StateEdit'> <Input type='text' name='state' defaultValue={state} onChange={handleChange} style={{ width: '140px' }} ></Input></td>
            </tr>
        </tbody>
        </table>
    )
}

export default BillingInfo;