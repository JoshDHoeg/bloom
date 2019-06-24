//BLOOMTIME DESIGN 2019
import React from 'react';
import { Form, TextArea, Message, Container } from 'semantic-ui-react';
import Editor from '../../../../../../components/DesignerWysiwig/wysiwig'
const Narrative = (props) => (
    <div>
        {props.edit ? (
            <NarrativeEdit formSubmit={props.formSubmit} narrative={props.narrative} handleChange={props.handleChange}/>
        ) : (
                <NarrativeView narrative={props.narrative} />
            )}
    </div>
);

const NarrativeView = (props) => {
    const narrative = props.narrative;
    return (
        <Container style={{paddingBottom:'6px'}}>
            <Message content={{narrative}}/>
        </Container>
    )
}

const NarrativeEdit = (props) => {
    return (
        <Form style={{paddingBottom: '15px'}}>
            <Editor formSubmit={props.formSubmit} name="narrative" narrative={props.narrative} />
        </Form>
    )
}

export default Narrative;