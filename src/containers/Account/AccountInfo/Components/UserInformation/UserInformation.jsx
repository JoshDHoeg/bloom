//BLOOMTIME DESIGN 2019
import React from 'react';

const UserInfo = (props) => (
    <div>
        {props.edit ? (
            <UserInfoEdit name={props.name} email={props.email} phone={props.phone}/>
        ) : (
                <UserInfoView name={props.name} email={props.email} phone={props.phone}/>
            )}
    </div>
);

const UserInfoView = (props) => {
    const name = props.name;
    const email = props.email;
    const phone = props.phone;
    return (
        <table className="ui definition table">
        <tbody>
            <tr>
                <td>Name:</td>
                <td> </td> {/*used for spacing*/}
                <td id ='NameTxt'>Elon{name}</td> {/* should be state, used temp value until one exists */}
            </tr>
            <tr>
                <td>Email:</td>
                <td> </td>
                <td id ='EmailTxt'>anemail@email.com{email}</td>
            </tr>
            <tr>
                <td>Phone:</td>
                <td></td>
                <td id ='PhoneTxt'>629-333-545{phone}</td>
            </tr>
        </tbody>
        </table>
    )
}

const UserInfoEdit = (props) => {
    const name = props.name;
    const email = props.email;
    const phone = props.phone;
    return (
        <table className="ui definition table">
        <tbody>
            <tr>
                <td>Name:</td>
                <td> </td>
                <td id ='EditNameTxt'> <input type='text' id='NameEditTxt' View ={name} style={{ width: '140px' }} ></input></td>
            </tr>
            <tr>
                <td>Email:</td>
                <td> </td>
                <td id ='EditEmailTxt'> <input type='text' id='EmailEditTxt' View={email} style={{ width: '140px' }} ></input></td>
            </tr>
            <tr>
                <td>Phone:</td>
                <td></td>
                <td id ='EditPhoneTxt'><input type='text' id='PhoneEditTxt' View={phone} style={{ width: '140px' }} ></input></td>
            </tr>
        </tbody>
        </table>
    )
}

export default UserInfo;