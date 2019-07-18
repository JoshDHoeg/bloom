import React, { Component } from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { withAuthorization } from '../../utilities/Session';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
<<<<<<< HEAD
import { Form, Grid, Message, Header, Item } from 'semantic-ui-react'
import draftToHtml, {hashtagConfig, directional, customEntityTransform} from 'draftjs-to-html'
import parse from 'html-react-parser'
=======
import { Form, Grid, Message, Header, Item, Segment } from 'semantic-ui-react'
import draftToHtml, {hashtagConfig, directional, customEntityTransform} from 'draftjs-to-html'
import parse from 'html-react-parser'
import introJs from 'intro.js';
import 'intro.js/introjs.css';
>>>>>>> 2c9a7fdb3c6d40e041db2efd69cf725d637e7afa

class Editors extends Component {
    final;
    revision;
    draft;
<<<<<<< HEAD
=======
    user;
>>>>>>> 2c9a7fdb3c6d40e041db2efd69cf725d637e7afa
    constructor(props) {
        super(props);
        this.state = {
        editorState: EditorState.createEmpty(),
<<<<<<< HEAD
=======
        color: '',
>>>>>>> 2c9a7fdb3c6d40e041db2efd69cf725d637e7afa
        final:{
            feedback: ''
        },
        revision:{
            feedback: ''
        },
        draft:{
            feedback: ''
        },
<<<<<<< HEAD
        markup: ''
=======
        markup: '',
        state: ''
>>>>>>> 2c9a7fdb3c6d40e041db2efd69cf725d637e7afa
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
<<<<<<< HEAD
           this.state.revision.feedback = markup;
           this.revision.feedback = this.state.revision.feedback;
       }
=======
        this.state.revision.feedback = markup;
        this.revisions[this.state.currentRevision].feedback = this.state.revision.feedback;
       }

>>>>>>> 2c9a7fdb3c6d40e041db2efd69cf725d637e7afa
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
<<<<<<< HEAD
        }else{
            var currentRevision = '0';
        }
        if(this.state.state === 'final' || this.state.state === 'draft'){
=======
>>>>>>> 2c9a7fdb3c6d40e041db2efd69cf725d637e7afa
            const state = await {
                loading: false,
                final: {
                    ...this.final.getAll()
                },
                draft: {
                    ...this.draft.getAll()
                },
<<<<<<< HEAD
=======
                revision: this.revisions[currentRevision].data,
                currentRevision: currentRevision
>>>>>>> 2c9a7fdb3c6d40e041db2efd69cf725d637e7afa
            }
            this.setState(state);
            return state;
        }else{
<<<<<<< HEAD
=======
            var currentRevision = '0';
        }if(this.state.state === 'final' || this.state.state === 'draft'){
>>>>>>> 2c9a7fdb3c6d40e041db2efd69cf725d637e7afa
            const state = await {
                loading: false,
                final: {
                    ...this.final.getAll()
                },
                draft: {
                    ...this.draft.getAll()
                },
<<<<<<< HEAD
                revision: this.revisions[currentRevision].data,
                currentRevision: currentRevision
=======
>>>>>>> 2c9a7fdb3c6d40e041db2efd69cf725d637e7afa
            }
            this.setState(state);
            return state;
        }
<<<<<<< HEAD
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
=======
    
    }

    render() {
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
>>>>>>> 2c9a7fdb3c6d40e041db2efd69cf725d637e7afa
        if(!this.props.approved){
        const { editorState } = this.state;
            return (
                <Grid>
<<<<<<< HEAD
                    <Grid.Row style={{ paddingBottom: '50px'}} hidden = {!this.state.state} >
                        <div style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                        <h1 style={{ backgroundColor: "#F5BDF9", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Feedback</h1>
                        <Form success className='attached fluid' onSubmit={this.props.handleNav} style={{maxWidth: "80%", display: "block", margin: "auto", paddingBottom: "20px"}}>
                            <div style={{backgroundColor: '#FFEF7', width:'80', margin: 'auto', boxShadow: '0px 0px 6px 1px rgba(0,0,0,0.1)', height:'300px', overflowY: 'scroll', padding:'20px', fontSize: '18px', border: '1px solid grey', borderRadius: '4px'}}>
                                <Header as='h2'>Leave Feedback For Your Designer</Header>
                                    <Editor
                                    editorState={editorState}
                                    toolbarClassName = "toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName"
=======
                    <Grid.Row hidden = {!this.state.state} >
                        <Segment raised style={{borderBottom: color}}>
                        <Form success className='attached fluid' onSubmit={this.props.handleNav} style={{maxWidth: "97%", display: "block", margin: "auto", paddingBottom: "10px"}}>
                            <div data-intro={this.props.data} style={{backgroundColor: '#FFEF7', width:'100', height:'300px', overflowY:'scroll', paddingTop:'10px', fontSize: '18px'}}>
                                <Header style={{textAlign:'center', paddingTop:'10px'}} as='h3'>Leave Feedback For Your Designer</Header>
                                    <Editor
                                    editorState={editorState}
                                    toolbarClassName = "toolbarClassName"
                                    wrapperClassName="demo-wrapper"
                                    editorClassName="demo-editor"
>>>>>>> 2c9a7fdb3c6d40e041db2efd69cf725d637e7afa
                                    onEditorStateChange={this.onEditorStateChange}
                                    />
                            </div>
                                    <Message 
<<<<<<< HEAD
=======
                                        style={{textAlign:'center'}}
>>>>>>> 2c9a7fdb3c6d40e041db2efd69cf725d637e7afa
                                        success
                                        hidden = {!this.props.approved}
                                        header='Feedback Received:' 
                                        content= {feedback || 'feedback'}/>
                                    <Message
<<<<<<< HEAD
=======
                                        style={{textAlign:'center'}}
>>>>>>> 2c9a7fdb3c6d40e041db2efd69cf725d637e7afa
                                        success
                                        hidden = {!this.props.feedbackState}
                                        header='Feedback Received:' 
                                        content= {feedback || 'feedback'}/>
<<<<<<< HEAD
                                    <Grid.Row style={{paddingTop:'10px', display:'flex', justifyContent:'center'}}>
                                    {this.props.feedbackButton}
                                    </Grid.Row>
                            </Form>
                        </div>
=======
                                    <Grid.Row style={{display:'flex', justifyContent:'center'}}>
                                    {this.props.feedbackButton}
                                    </Grid.Row>
                            </Form>
                        </Segment>
>>>>>>> 2c9a7fdb3c6d40e041db2efd69cf725d637e7afa
                    </Grid.Row>
                </Grid>
        )
        }else{
            return(
                <Grid>
<<<<<<< HEAD
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
=======
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
>>>>>>> 2c9a7fdb3c6d40e041db2efd69cf725d637e7afa
                                    hidden = {!this.props.approved}
                                    header='Feedback Received:' 
                                    content= {feedback || 'feedback'}/>
                                <Message
                                    success
<<<<<<< HEAD
                                    hidden = {!this.props.feedbackState}
                                    header='Feedback Received:' 
                                    content= {feedback || 'feedback'}/>
                                {this.props.feedbackButton}
                            </Form>
                        </div>
=======
                                    style={{textAlign:'center'}}
                                    hidden = {!this.props.feedbackState}
                                    header='Feedback Received:' 
                                    content= {feedback || 'feedback'}/>
                                <Grid.Row style={{paddingTop:'10px', display:'flex', justifyContent:'center'}}>
                                    {this.props.feedbackButton}
                                </Grid.Row>
                            </Form>
                        </Segment>
>>>>>>> 2c9a7fdb3c6d40e041db2efd69cf725d637e7afa
                    </Grid.Row>
                </Grid>
            )
        }
    }
    }

const condition = role => role > 0

export default withAuthorization(condition)(Editors);
