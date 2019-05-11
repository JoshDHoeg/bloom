// BLOOMTIME DESIGN 2019
import React from 'react';
import { Input } from 'semantic-ui-react';

const Budget = (props) => (
    <div>
        {props.edit ? (
            <BudgetEdit budget={props.budget}
                        handleChangeBudget={props.handleChangeBudget}
            />
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
            <td>{budget}</td>
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
                <td id="BudgetEdit" >Budget:
                    <Input name="budget" onChange={props.handleChangeBudget} type="text" id="BudgetEditTxt" defaultValue={budget} style={{ width: '140px' }} >
                    </Input>
                </td>
            </tr>
        </tbody>
        </table>
    )
}

export default Budget;

