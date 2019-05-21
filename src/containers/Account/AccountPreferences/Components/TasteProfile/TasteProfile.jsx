// BLOOMTIME DESIGN 2019
import React from 'react';
import { Input } from 'semantic-ui-react';


const TasteProfile = (props) => (
    <div>
        {props.edit ? (
        <TasteProfileEdit
            prof={props.prof}
            handleChangeProf={props.handleChangeProf}
        />
        ) : (
        <TasteProfileView
            prof={props.prof}
        />
        )}
    </div>
);

const TasteProfileView = (props) => {
    return (
         <div style={{fontSize: 15}}>
             <table className="ui definition table">
                 <tbody>
                     <tr>
                         <td>Edging:</td>
                         <td> </td> {/*used for spacing*/}
                         <td id ='Edging'>{props.prof.edging}</td> {/* should be state, used temp value until one exists */}
                     </tr>
                     <tr>
                         <td>Form:</td>
                         <td> </td>
                         <td id ='Form'>{props.prof.form}</td>
                     </tr>
                     <tr>
                         <td>Ground:</td>
                         <td></td>
                         <td id ='Ground'>{props.prof.ground}</td>
                     </tr>
                     <tr>
                         <td>Spacing:</td>
                         <td></td>
                         <td id ='Spacing'>{props.prof.spacing}</td>
                     </tr>
                     <tr>
                         <td>Variety:</td>
                         <td></td>
                         <td id ='Variety'>{props.prof.variety}</td>
                     </tr>
                 </tbody>
             </table>
        </div>
    )
}

const TasteProfileEdit = (props) => {
    return (
        <div style={{fontSize: 13}}>
            <table className="ui definition table">
                <tbody>
                <tr>
                    <td>Edging:</td>
                    <td> </td>
                    <td id ='EdgingTxt'>
                        <Input onChange={props.handleChangeProf} name="edging"  type='text' id='EdgingEditTxt' value={props.prof.edging} style={{ width: '140px' }} >
                        </Input>
                    </td>
                </tr>
                    <tr>
                    <td>Form:</td>
                    <td> </td>
                    <td id ='FormTxt'>
                        <Input onChange={props.handleChangeProf} name="form" type='text' id='FormEditTxt' value={props.prof.form} style={{ width: '140px' }} >
                        </Input>
                    </td>
                </tr>
                <tr>
                    <td>Ground:</td>
                    <td></td>
                    <td id ='GroundTxt'>
                        <Input onChange={props.handleChangeProf} name="ground" type='text' id='GroundEditTxt' value={props.prof.ground} style={{ width: '140px' }} >
                        </Input>
                    </td>
                </tr>
                <tr>
                    <td>Spacing</td>
                    <td></td>
                    <td id ='SpacingTxt'>
                        <Input onChange={props.handleChangeProf} name="spacing" type='text' id='SpacingEditTxt' value={props.prof.spacing} style={{ width: '140px' }} >
                        </Input>
                    </td>
                </tr>
                <tr>
                    <td>Variety:</td>
                    <td></td>
                    <td id ='VarietyTxt'>
                        <Input onChange={props.handleChangeProf} name="variety"  type='text' id='VarietyEditTxt' value={props.prof.variety} style={{ width: '140px' }} >
                        </Input>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TasteProfile;
