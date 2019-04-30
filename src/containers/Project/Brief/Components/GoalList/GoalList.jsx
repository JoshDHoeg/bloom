// BLOOMTIME DESIGN 2019
import React from 'react';

const GoalList = (props) => (
    <div>
        {props.edit ? (
        <GoalListEdit goals={props.goals} handleChange={props.updateGoals}/>
        ) : (
        <GoalListView goals={props.goals} />
        )}
    </div>
);

const GoalListView = (props) => {
    const goals = props.goals;
    //console.log(goals);
    return (
            <ul id="goals">
                {goals.map((g, i) => (
                    <li key={i} id={`goal${i}`}>
                        {g.content}
                    </li>
                ))}
            </ul>
    )
}

const GoalListEdit = (props) => {
    const goals = props.goals;
    return (
        <div id='GoalsEdit' style={{ listStyleType: 'none', paddingBottom: "15px" }}>
            {goals.map((g, i) => (
                <li key={i}>
                    <input type="text" id={`Goal${i}Text`} value={g} style={{}} onchange={props.handleChange}/>
                </li>
            ))}
        </div>
    )
}

export default GoalList;


