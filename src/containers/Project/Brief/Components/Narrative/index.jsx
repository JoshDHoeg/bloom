// BLOOMTIME DESIGN 2019
import React from 'react';

const Narrative = (props) => (
    <div>
        {props.edit ? (
        <NarrativeEdit />
        ) : (
        <NarrativeView />
        )}
    </div>
);

const NarrativeView = () => {
    return (
        <div>this is the goal view </div>
    )
}

const NarrativeEdit = () => {
    return (
        <div>this is the goal Edit </div>
    )
}

export default Narrative;