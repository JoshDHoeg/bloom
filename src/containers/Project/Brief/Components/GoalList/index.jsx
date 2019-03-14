// BLOOMTIME DESIGN 2019
import React from 'react';

const GoalList = (props) => (
    <div>
        {props.edit ? (
        <GoalListEdit goals={props.brief.goals} />
        ) : (
        <GoalListView goals={props.brief.goals} />
        )}
    </div>
);

const GoalListView = (props) => {
    const goals = props.goals;
    return (
            <ul id="goals">
                {goals.map((g, i) => (
                    <li key={i} id={`goal${i}`}>{g}</li>
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
                    <input type="text" id={`Goal${i}Text`} defaultValue={g} style={{}} />
                </li>
            ))}
        </div>
    )
}

export default GoalList;


