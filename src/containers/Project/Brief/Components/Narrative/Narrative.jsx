//BLOOMTIME DESIGN 2019
import React from 'react';
<<<<<<< HEAD
import { Form, TextArea } from 'semantic-ui-react'
=======
import { Form, TextArea } from 'semantic-ui-react';
>>>>>>> 56a5ed899c5775f76634bc9d54ec44514c16956c

const Narrative = (props) => (
    <div>
        {props.edit ? (
<<<<<<< HEAD
            <NarrativeEdit narrative={props.narrative} updateNarrative={props.updateNarrative}/>
=======
            <NarrativeEdit narrative={props.narrative} handleChange={props.handleChange}/>
>>>>>>> 56a5ed899c5775f76634bc9d54ec44514c16956c
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
<<<<<<< HEAD
    const narrative = props.narrative;
    return (
        <Form >
            <TextArea placeholder={narrative} id="EditNarrativeTxt" />
=======
    return (
        <Form >
            <TextArea value={props.narrative} name="narrative" id="EditNarrativeTxt" onChange={props.handleChange} />
>>>>>>> 56a5ed899c5775f76634bc9d54ec44514c16956c
        </Form>
    )
}

export default Narrative;