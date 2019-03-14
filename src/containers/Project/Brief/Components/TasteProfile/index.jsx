// BLOOMTIME DESIGN 2019
import React from 'react';

const TasteProfile = (props) => (
    <div>
        {props.edit ? (
        <TasteProfileEdit />
        ) : (
        <TasteProfileView />
        )}
    </div>
);

const TasteProfileView = () => {
    return (
        <div>this is the goal view </div>
    )
}

const TasteProfileEdit = () => {
    return (
        <div>this is the goal Edit </div>
    )
}

export default TasteProfile;