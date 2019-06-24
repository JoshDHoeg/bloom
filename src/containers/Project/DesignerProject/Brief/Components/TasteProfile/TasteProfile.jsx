// BLOOMTIME DESIGN 2019
import React from 'react';
import { Input, Container, Message, Grid, Item } from 'semantic-ui-react';


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
        <div>
            <div>
                <Container fluid textAlign='center' text='true'>
                    <Grid columns={2}>
                        <Grid.Row>
                            <Grid.Column>
                                <Item>Spacing: </Item>
                                <Message 
                                content={props.brief.profile.spacing}/>
                            </Grid.Column>
                            <Grid.Column>
                                <Item>Variety: </Item>
                                <Message 
                                content={props.brief.profile.variety}/>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Item>Edging: </Item>
                                <Message 
                                content={props.brief.profile.edging}/>
                            </Grid.Column>
                            <Grid.Column>
                                <Item>Ground Cover: </Item>
                                <Message 
                                content={props.brief.profile.ground}/>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        <div>
        <Container fluid textAlign='center' text='true'>
                <Grid columns={1}>
                    <Grid.Row>
                        <Grid.Column>
                            <Item>Plant Form: </Item>
                            <Message 
                            content={props.brief.profile.form}/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
        </Container>
        </div>
    </div>
    )
}

const TasteProfileEdit = (props) => {
    return (
        <div>
            <div>
            <Container fluid textAlign='center' text='true'>
                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column>
                            <Item>Spacing: </Item>
                            <Input name="spacing" value={props.brief.profile.spacing} onChange={props.handleChangeProfile}/>
                        </Grid.Column>
                        <Grid.Column>
                            <Item>Variety: </Item>
                            <Input name="variety" value={props.brief.profile.variety} onChange={props.handleChangeProfile}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Item>Edging: </Item>
                            <Input name="edging" value={props.brief.profile.edging} onChange={props.handleChangeProfile}/>
                        </Grid.Column>
                        <Grid.Column>
                            <Item>Ground Cover: </Item>
                            <Input name="ground" value={props.brief.profile.ground} onChange={props.handleChangeProfile}/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
            </div>
            <div>
            <Container fluid textAlign='center' text='true'>
                    <Grid columns={1}>
                        <Grid.Row>
                            <Grid.Column>
                                <Item>Plant Form: </Item>
                                <Input name="form" value={props.brief.profile.form} onChange={props.handleChangeProfile}/>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
            </Container>
            </div>
        </div>
        
    )
}

export default TasteProfile;