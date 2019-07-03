import React, { Component } from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { withAuthorization } from '../../utilities/Session';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Form, Grid, Message, Header, Item } from 'semantic-ui-react'
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
        final:{
            feedback: ''
        },
        revision:{
            feedback: ''
        },
        draft:{
            feedback: ''
        },
        markup: ''
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
           this.revision.feedback = this.state.revision.feedback;
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
        }else{
            var currentRevision = '0';
        }
        if(this.state.state === 'final' || this.state.state === 'draft'){
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
        }else{
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
        }
    }

    render() {
        let feedback
        if(this.state.state === 'final'){
            feedback = parse(this.state.final.feedback);
        }else if(this.state.state === 'draft'){
            feedback = parse(this.state.draft.feedback);
        }else if(this.state.state === 'revision'){
            feedback = parse(this.state.revision.feedback);
        }
        if(!this.props.approved){
        const { editorState } = this.state;
            return (
                <Grid>
                    <Grid.Row style={{ paddingBottom: '50px'}} hidden = {!this.state.state} >
                        <div style={{ paddingLeft:"20px", backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                        <h1 style={{ backgroundColor: "#F5BDF9", color: "white", textAlign: "center", fontSize: "15px", padding: "0px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Feedback</h1>
                        <Form success className='attached fluid' onSubmit={this.props.handleNav} style={{maxWidth: "80%", display: "block", margin: "auto", paddingBottom: "20px"}}>
                            <div style={{backgroundColor: '#FFEF7', width:'80', margin: 'auto', boxShadow: '0px 0px 6px 1px rgba(0,0,0,0.1)', height:'300px', overflowY: 'scroll', padding:'20px', fontSize: '18px', border: '1px solid grey', borderRadius: '4px'}}>
                                <Header as='h2'>Leave Feedback For Your Designer</Header>
                                    <Editor
                                    editorState={editorState}
                                    toolbarClassName = "toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName"
                                    onEditorStateChange={this.onEditorStateChange}
                                    />
                            </div>
                                    <Message 
                                        success
                                        hidden = {!this.props.approved}
                                        header='Feedback Received:' 
                                        content= {feedback || 'feedback'}/>
                                    <Message
                                        success
                                        hidden = {!this.props.feedbackState}
                                        header='Feedback Received:' 
                                        content= {feedback || 'feedback'}/>
                                    <Grid.Row style={{paddingTop:'10px', paddingBottom:'10px'}}>
                                    {this.props.feedbackButton}
                                    </Grid.Row>
                            </Form>
                        </div>
                    </Grid.Row>
                </Grid>
        )
        }else{
            return(
                <Grid>
                    <Grid.Row style={{ display:'block', margin:'auto', paddingBottom: '50px'}} hidden = {!this.state.state} >
                        <div style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                        <h1 style={{ backgroundColor: "#F5BDF9", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Feedback</h1>
                            <Form success className='attached fluid' onSubmit={this.props.handleNav} style={{maxWidth: "80%", display: "block", margin: "auto", paddingBottom: "20px"}}>
                                <Grid.Row style={{paddingTop:'10px', paddingBottom:'10px'}}>
                                    <Header as='h2'>Thank You For Your Feedback</Header>
                                    <Item>Your designer will work hard to accommodate your feedback</Item>
                                </Grid.Row>
                                <Message 
                                    success
                                    hidden = {!this.props.approved}
                                    header='Feedback Received:' 
                                    content= {feedback || 'feedback'}/>
                                <Message
                                    success
                                    hidden = {!this.props.feedbackState}
                                    header='Feedback Received:' 
                                    content= {feedback || 'feedback'}/>
                                {this.props.feedbackButton}
                            </Form>
                        </div>
                    </Grid.Row>
                </Grid>
            )
        }
    }
    }

const condition = role => role > 0

export default withAuthorization(condition)(Editors);
