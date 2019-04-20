// BLOOMTIME DESIGN 2019
import React from 'react';
import { Form, TextArea } from 'semantic-ui-react';

const Narrative = (props) => (
    <div>
        {props.edit ? (
            <NarrativeEdit narrative={props.narrative} handleChange={props.handleChange}/>
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
    return (
        <Form >
            <TextArea value={props.narrative} name="narrative" id="EditNarrativeTxt" onChange={props.handleChange} />
        </Form>
    )
}

export default Narrative;