// BLOOMTIME DESIGN 2019
import React from 'react';
import { Input, Container } from 'semantic-ui-react';


const TasteProfile = (props) => (
        <div>
            {props.edit ? (
            <TasteProfileEdit brief={props.brief} handleChangeProfile={props.handleChangeProfile}/>
            ) : (
            <TasteProfileView brief={props.brief} />
            )}
        </div>
);

const TasteProfileView = (props) => {
    return (
        <Container>
            <div>{props.brief.profile.spacing}</div>

            <div>{props.brief.profile.variety}</div>

            <div>{props.brief.profile.edging}</div>

            <div>{props.brief.profile.ground}</div>

            <div>{props.brief.profile.form}</div>
        </Container>
    )
}

const TasteProfileEdit = (props) => {
    return (
        <Container>
            <label id="SpacingEdit">Spacing</label>
            <Input name="spacing" value={props.brief.profile.spacing} onChange={props.handleChangeProfile}/>

            <label id="VarietyEdit">Variety</label>
            <Input name="variety" value={props.brief.profile.variety} onChange={props.handleChangeProfile}/>

            <label id="EdgingEdit">Edging</label>
            <Input name="edging" value={props.brief.profile.edging} onChange={props.handleChangeProfile}/>

            <label id="GroundEdit">Ground Cover</label>
            <Input name="ground" value={props.brief.profile.ground} onChange={props.handleChangeProfile}/>

            <label id="FormEdit">Plant Form</label>
            <Input name="form" value={props.brief.profile.form} onChange={props.handleChangeProfile}/>
        </Container>
        
    )
}

export default TasteProfile;