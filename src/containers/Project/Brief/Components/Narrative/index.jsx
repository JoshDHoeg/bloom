// BLOOMTIME DESIGN 2019
import React from 'react';

const Narrative = (props) => (
    <div>
        {props.edit ? (
            <NarrativeEdit narrative={props.narrative} updateNarrative={props.updateNarrative}/>
        ) : (
                <NarrativeView narrative={props.narrative} />
            )}
    </div>
);

const NarrativeView = (props) => {
    const narrative = props.narrative;
    return (
        <div>
            <p id="NarrativeTxt">{narrative}</p>
        </div>
    )
}

const NarrativeEdit = (props) => {
    
    const narrative = props.narrative;
    console.log("UHHHH" + narrative);
    return (
        <div >
            <input type="text" id="EditNarrativeTxt" defaultValue={narrative} />
        </div>
    )
}

export default Narrative;