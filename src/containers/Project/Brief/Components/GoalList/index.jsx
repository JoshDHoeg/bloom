// BLOOMTIME DESIGN 2019
import React from 'react';

const GoalList = (props) => (
    <div>
        {props.edit ? (
        <GoalListEdit />
        ) : (
        <GoalListView />
        )}
    </div>
);

const GoalListView = () => {
    return (
        <div>this is the goal view </div>
    )
}

const GoalListEdit = () => {
    return (
        <div>this is the goal Edit </div>
    )
}

export default GoalList;


