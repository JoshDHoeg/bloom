//BLOOMTIME DESIGN 2019
import React from 'react';
import {Input} from 'semantic-ui-react';

const PaymentInfo = (props) => (
    <div>
        {props.edit ? (
            <PaymentInfoEdit 
            card={props.payment.card} 
            exp={props.payment.exp} 
            cvc={props.payment.cvc} />
        ) : (
                <PaymentInfoView 
                card={props.payment.card} 
                exp={props.payment.exp} 
                cvc={props.payment.cvc} />
            )}
    </div>
);

const PaymentInfoView = (props) => {
    const card = props.card;
    const exp = props.exp;
    const cvc = props.cvc;
    return (
        <table class="ui definition table">
        <tbody>
            <h3>Card Information:</h3>
            <tr>
                <td>Card Number:</td>
                <td>{card}</td>
            </tr>
            <tr>
                <td>Expiration Date:</td>
                <td>{exp}</td>
            </tr>
            <tr>
                <td>CVC:</td>
                <td>{cvc}</td>
            </tr>
        </tbody>
        </table>
    )
}

const PaymentInfoEdit = (props) => {
    const card = props.card;
    const exp = props.exp;
    const cvc = props.cvc;
    return(
        <table class="ui definition table">
        <tbody>
            <h3>Edit Card Information:</h3>
            <tr>
                <td>Card Number:</td>
                <td id ='CardEdit'> <Input type='text' id='CardEditTxt' View ={card} style={{ width: '140px' }} ></Input></td>
            </tr>
            <tr>
                <td>Expiration Date:</td>
                <td id ='ExpEdit'> <Input type='text' id='ExpEditTxt' View ={exp} style={{ width: '140px' }} ></Input></td>
            </tr>
            <tr>
                <td>CVC:</td>
                <td id ='CVCEdit'> <Input type='text' id='CVCEditTxt' View ={cvc} style={{ width: '140px' }} ></Input></td>
            </tr>
        </tbody>
        </table>
    )
}

export default PaymentInfo;