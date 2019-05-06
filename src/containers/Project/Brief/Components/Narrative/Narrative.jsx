//BLOOMTIME DESIGN 2019
import React from 'react';
import { Form, TextArea } from 'semantic-ui-react'

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
    return (
        <Form >
            <TextArea placeholder={narrative} id="EditNarrativeTxt" />
        </Form>
    )
}

export default Narrative;