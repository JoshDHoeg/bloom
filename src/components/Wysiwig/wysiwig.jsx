import React, { Component } from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { withAuthorization } from '../../utilities/Session';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Form, Grid, Message, Header, Item, Segment } from 'semantic-ui-react'
import draftToHtml, {hashtagConfig, directional, customEntityTransform} from 'draftjs-to-html'
import parse from 'html-react-parser'

class Editors extends Component {
    final;
    revision;
    draft;
    constructor(props) {
        super(props);
        this.state = {
        editorState: EditorState.createEmpty(),
        color: '',
        final:{
            feedback: ''
        },
        revision:{
            feedback: ''
        },
        draft:{
            feedback: ''
        },
        markup: '',
        state: ''
        };
        this.onEditorStateChange = this.onEditorStateChange.bind(this)
    }

    onEditorStateChange = (editorState) => {
        let state = this.state.state;
        let markup;
        let contentState;
        contentState = editorState.getCurrentContent();
        const rawDraftContentState = convertToRaw((contentState));
        markup = draftToHtml(rawDraftContentState, hashtagConfig, directional, customEntityTransform);
        const converted = parse(markup)
        this.setState({
        editorState,
        contentState: editorState.getCurrentContent(),
        converted: parse(this.state.markup),
        });

       if(this.state.state === 'final'){ 
        this.state.final.feedback = markup;
        this.final.feedback = this.state.final.feedback;
       }else if(this.state.state === 'draft'){
        this.state.draft.feedback = markup;
        this.draft.feedback = this.state.draft.feedback;
       }else {
        this.state.revision.feedback = markup;
        this.revisions[this.state.currentRevision].feedback = this.state.revision.feedback;
       }

    };

    componentDidMount() {
        this.getProjectState();
        if(this.props.state){
            this.setState({
                state: this.props.state
            })
        }
    }

    getProjectState = async () => {
        const project = await this.props.firebase.doGetProject(this.props.firebase.user.uid, this.props.firebase.activeProject, true);
        this.final = await project.final;
        this.draft = await project.draft;
        this.revisions = await project.revisions;
        let string = this.props.location.pathname;
        var array = string.split("/");
        if(this.state.state === 'revision'){
            var currentRevision = array[3];
            const state = await {
                loading: false,
                final: {
                    ...this.final.getAll()
                },
                draft: {
                    ...this.draft.getAll()
                },
                revision: this.revisions[currentRevision].data,
                currentRevision: currentRevision
            }
            this.setState(state);
            return state;
        }else{
            var currentRevision = '0';
        }if(this.state.state === 'final' || this.state.state === 'draft'){
            const state = await {
                loading: false,
                final: {
                    ...this.final.getAll()
                },
                draft: {
                    ...this.draft.getAll()
                },
            }
            this.setState(state);
            return state;
        }
    
    }

    render() {
        console.log('fuck', this.state.revision.feedback)
        let feedback;
        let color;
        if(this.state.state === 'final'){
            feedback = parse(this.state.final.feedback);
            this.state.color = '5px solid #84DB95';
        }else if(this.state.state === 'draft'){
            feedback = parse(this.state.draft.feedback);
            this.state.color = '5px solid #FA907F';
        }else if(this.state.state === 'revision'){
            feedback = parse(this.state.revision.feedback);
            this.state.color = '5px solid #F5BDF9';
        }
        color = this.state.color;
        if(!this.props.approved){
        const { editorState } = this.state;
            return (
                <Grid>
                    <Grid.Row hidden = {!this.state.state} >
                        <Segment raised style={{borderBottom: color}}>
                        <Form success className='attached fluid' onSubmit={this.props.handleNav} style={{maxWidth: "97%", display: "block", margin: "auto", paddingBottom: "10px"}}>
                            <div style={{backgroundColor: '#FFEF7', width:'100', height:'300px', overflowY:'scroll', paddingTop:'10px', fontSize: '18px'}}>
                                <Header style={{textAlign:'center', paddingTop:'10px'}} as='h3'>Leave Feedback For Your Designer</Header>
                                    <Editor
                                    editorState={editorState}
                                    toolbarClassName = "toolbarClassName"
                                    wrapperClassName="demo-wrapper"
                                    editorClassName="demo-editor"
                                    onEditorStateChange={this.onEditorStateChange}
                                    />
                            </div>
                                    <Message 
                                        style={{textAlign:'center'}}
                                        success
                                        hidden = {!this.props.approved}
                                        header='Feedback Received:' 
                                        content= {feedback || 'feedback'}/>
                                    <Message
                                        style={{textAlign:'center'}}
                                        success
                                        hidden = {!this.props.feedbackState}
                                        header='Feedback Received:' 
                                        content= {feedback || 'feedback'}/>
                                    <Grid.Row style={{display:'flex', justifyContent:'center'}}>
                                    {this.props.feedbackButton}
                                    </Grid.Row>
                            </Form>
                        </Segment>
                    </Grid.Row>
                </Grid>
        )
        }else{
            return(
                <Grid>
                    <Grid.Row style={{ display:'block', margin:'auto'}} hidden = {!this.state.state} >
                        <Segment raised style={{borderBottom: color}}>
                            <Form success className='attached fluid' onSubmit={this.props.handleNav} style={{maxWidth: "80%", display: "block", margin: "auto", paddingBottom: "20px"}}>
                                <Grid.Row style={{paddingTop:'10px', paddingBottom:'10px'}}>
                                    <Header style={{textAlign:'center', paddingTop:'10px'}} as='h3'>Thank You For Your Feedback</Header>
                                    <Item style={{textAlign:'center'}}>Your designer will work hard to accommodate your feedback</Item>
                                </Grid.Row>
                                <Message 
                                    success
                                    style={{textAlign:'center'}}
                                    hidden = {!this.props.approved}
                                    header='Feedback Received:' 
                                    content= {feedback || 'feedback'}/>
                                <Message
                                    success
                                    style={{textAlign:'center'}}
                                    hidden = {!this.props.feedbackState}
                                    header='Feedback Received:' 
                                    content= {feedback || 'feedback'}/>
                                <Grid.Row style={{paddingTop:'10px', display:'flex', justifyContent:'center'}}>
                                    {this.props.feedbackButton}
                                </Grid.Row>
                            </Form>
                        </Segment>
                    </Grid.Row>
                </Grid>
            )
        }
    }
    }

const condition = role => role > 0

export default withAuthorization(condition)(Editors);
