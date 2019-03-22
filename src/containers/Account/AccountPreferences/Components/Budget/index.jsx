// BLOOMTIME DESIGN 2019
import React from 'react';

const Budget = (props) => (
    <div>
        {props.edit ? (
            <BudgetEdit budget={props.budget} />
        ) : (
                <BudgetView budget={props.budget}/>
            )}
    </div>
);

const BudgetView = (props) => {
    const budget = props.budget;
    return (
        <table class="ui definition table">
        <tbody>
            <h3>Budget:</h3>
            <tr>
            <td>Budget:</td>
            <td>$1500{budget}</td> {/*used temp budget until one is assigned*/}
            </tr>
        </tbody>
        </table>
    )
}

const BudgetEdit = (props) => {
    const budget = props.budget;
    return (
        <table class="ui definition table">
        <tbody>
            <h3>Edit Budget:</h3>
            <tr>
                <td>Budget:</td>
                <td id="BudgetEdit" >Budget: <input type="text" id="BudgetEditTxt" defaultValue={budget} style={{ width: '140px' }} ></input></td>
            </tr>
        </tbody>
        </table>
    )
}

export default Budget;

