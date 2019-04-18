//BLOOMTIME DESIGN 2019
import React from 'react';

const PaymentInfo = (props) => (
    <div>
        {props.edit ? (
            <PaymentInfoEdit card={props.payment.card} exp={props.payment.exp} cvc={props.payment.cvc} billadd={props.payment.billadd} zip={props.payment.zip} city={props.payment.city} state={props.payment.state}/>
        ) : (
                <PaymentInfoView card={props.payment.card} exp={props.payment.exp} cvc={props.payment.cvc} billadd={props.payment.billadd} zip={props.payment.zip} city={props.payment.city} state={props.payment.state}/>
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
                <td id ='CardEdit'> <input type='text' id='CardEditTxt' View ={card} style={{ width: '140px' }} ></input></td>
            </tr>
            <tr>
                <td>Expiration Date:</td>
                <td id ='ExpEdit'> <input type='text' id='ExpEditTxt' View ={exp} style={{ width: '140px' }} ></input></td>
            </tr>
            <tr>
                <td>CVC:</td>
                <td id ='CVCEdit'> <input type='text' id='CVCEditTxt' View ={cvc} style={{ width: '140px' }} ></input></td>
            </tr>
        </tbody>
        </table>
    )
}

export default PaymentInfo;