// BLOOMTIME DESIGN 2019
import React from 'react';
import { toUnicode } from 'punycode';

import NewGoal from './NewGoal.jsx';
import EditGoal from './EditGoal.jsx';

const GoalList = (props) => (
    <div>
        {props.edit ? (
        <GoalListEdit goals={props.goals} deleteGoal={props.deleteGoal} addGoal={props.addGoal} editGoalSubmit={props.editGoalSubmit} editId={props.editId} editGoal={props.editGoal} />
        ) : (
        <GoalListView goals={props.goals} />
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
            {goals.map(goal => {

                if(props.editId !== goal.id){
                    return(
                        <div key={goal.id} id={goal.id} >
                            <span>{goal.content}</span>
                            <button onClick={() => {props.deleteGoal(goal.id)}}> delete</button>
                            <button onClick={() => {props.editGoal(goal.id)}}> edit</button>
                        </div>
                    )
                }else{
                    return(
                        <div key={goal.id} id={goal.id} >
                            <EditGoal goal={goal} editGoalSubmit={props.editGoalSubmit} />
                            <button onClick={() => {props.deleteGoal(goal.id)}}> delete</button>
                        </div>
                    )
                }
            })}
            <NewGoal addGoal={props.addGoal}/>
        </div>
    )
}

export default GoalList;


