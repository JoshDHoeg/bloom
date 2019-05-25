//BLOOMTIME DESIGN 2019
import React from 'react';
import { Input } from 'semantic-ui-react';

const UserInfo = (props) => {
    //console.log(props);
    return (
        <div>
            {props.edit ? (
                <UserInfoEdit 
                name={props.name} 
                phone={props.phone}
                handleChange={props.handleChange}/>
            ) : (
                <UserInfoView 
                name={props.name} 
                phone={props.phone}/>
            )}
        </div>
    );
}

const UserInfoView = (props) => {
    //console.log(props);
    const name = props.name;
    const email = props.email;
    const phone = props.phone;
    return (
        <table className="ui definition table">
        <tbody>
            <tr>
                <td>Name:</td>
                <td> </td> {/*used for spacing*/}
                <td id ='NameTxt'>{name}</td> {/* should be state, used temp value until one exists */}
            </tr>
            <tr>
                <td>Email:</td>
                <td> </td>
                <td id ='EmailTxt'>{email}</td>
            </tr>
            <tr>
                <td>Phone:</td>
                <td></td>
                <td id ='PhoneTxt'>{phone}</td>
            </tr>
        </tbody>
        </table>
    )
}
//try value for placeholder
const UserInfoEdit = (props) => {
    //console.log(props);
    const name = props.name;
    const phone = props.phone;
    const handleChange = props.handleChange
    return (
        <table className="ui definition table">
        <tbody>
            <tr>
                <td>Name:</td>
                <td> </td>
                <td id ='EditNameTxt'> <Input name="name" onChange={handleChange} type='text' id='NameEditTxt' defaultValue={name} style={{ width: '140px' }} ></Input></td>
            </tr>
            {/*<tr>*/}
                {/*<td>Email:</td>*/}
                {/*<td> </td>*/}
                {/*<td id ='EditEmailTxt'> <Input name="email" onChange={props.handleChange} type='text' id='EmailEditTxt' value={email} style={{ width: '140px' }} ></Input></td>*/}
            {/*</tr>*/}
            <tr>
                <td>Phone:</td>
                <td></td>
                <td id ='EditPhoneTxt'><Input name="phone" onChange={handleChange} type='text' id='PhoneEditTxt' defaultValue={phone} style={{ width: '140px' }} ></Input></td>
            </tr>
        </tbody>
        </table>
    )
}

export default UserInfo;
