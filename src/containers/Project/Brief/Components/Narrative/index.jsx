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

const NarrativeView = (props) => {
    return (
        <div>
            <p id="NarrativeTxt">{props.narrative}</p>
        </div>
    )
}

const NarrativeEdit = (props) => {
    return (
        <div >
            <input type="text" id="EditNarrativeTxt" defaultValue={props.narrative}/>
        </div>
    )
}

export default Narrative;