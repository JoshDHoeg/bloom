// BLOOMTIME DESIGN 2019
import React from 'react';
import { Icon, Container } from 'semantic-ui-react'

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
<<<<<<< HEAD
            <ul id="goals">
                {goals.map((g, i) => (
                    <li key={i} id={`goal${i}`}>{g}</li>
                ))}
                
            </ul>
=======
            <Container id="goals">
                {goals.map(goal => (
                    <div key={goal.id} id={`goal${goal.id}`}>{goal.content}</div>
                ))}
                
            </Container>
>>>>>>> 56a5ed899c5775f76634bc9d54ec44514c16956c
    )
}



const GoalListEdit = (props) => {
    const goals = props.goals;
<<<<<<< HEAD
=======
    console.log(goals);
>>>>>>> 56a5ed899c5775f76634bc9d54ec44514c16956c
    return (
        <Container id='GoalsEdit' style={{ listStyleType: 'none', paddingBottom: "15px" }}>
            {goals.map(goal => {

                if(props.editId !== goal.id){
                    return(
                        <div key={goal.id} id={goal.id} >
                            <span>{goal.content}</span>
                            <button onClick={() => {props.editGoal(goal.id)}}> <Icon fitted name='pencil' /></button>
                            <button onClick={() => {props.deleteGoal(goal.id)}}> <Icon fitted name='trash alternate outline' /></button>
                        </div>
                    )
                }else{
                    return(
                        <div key={goal.id} id={goal.id} >
                            <EditGoal goal={goal} editGoalSubmit={props.editGoalSubmit} />
                            <button onClick={() => {props.deleteGoal(goal.id)}}> <Icon fitted name='trash alternate outline' /></button>
                        </div>
                    )
                }
            })}
            <NewGoal addGoal={props.addGoal}/>
        </Container>
    )
}

export default GoalList;


