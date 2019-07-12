//BLOOMTIME DESIGN 2019
import React from 'react';
import parse from 'html-react-parser'
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
    const Narrative = parse(narrative)
    return (
        <Container style={{paddingLeft:'6px', paddingRight: '6px', paddingBottom:'6px'}}>
            <Message content={Narrative}/>
        </Container>
    )
}

const NarrativeEdit = (props) => {
    return (
        <Form style={{paddingBottom: '15px'}}>
            <Editor name="narrative" narrative={props.narrative} />
        </Form>
    )
}

export default Narrative;