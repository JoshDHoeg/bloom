import React, { Component } from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { withAuthorization } from '../../utilities/Session';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Form, Grid, Message, Header, Item } from 'semantic-ui-react'
import draftToHtml, {hashtagConfig, directional, customEntityTransform} from 'draftjs-to-html'
import parse from 'html-react-parser'

class DesignerEditor extends Component {
    brief;
    constructor(props) {
        super(props);
        this.state = {
        editorState: EditorState.createEmpty(),
        brief:{
            narrative: ''
        }
        }
        this.onEditorStateChange = this.onEditorStateChange.bind(this)
        this.formSubmit = this.formSubmit.bind(this)
    }

    componentDidMount() {
        this.getProjectState();
    }

    formSubmit() {
        this.brief.narrative = this.state.brief.narrative;
    }

    getProjectState = async () => {
        const project = await this.props.firebase.doGetProject(this.props.firebase.user.uid, this.props.firebase.activeProject, true);
        this.brief = await project.brief;
        const state = await {
            loading: false,
            brief: {
              ...this.brief.getAll()
            }
        }
        this.setState(state);
        return state;
    }

    onEditorStateChange = (editorState) => {
        let markup;
        let contentState;
        contentState = editorState.getCurrentContent();
        const rawDraftContentState = convertToRaw((contentState));
        markup = draftToHtml(rawDraftContentState, hashtagConfig, directional, customEntityTransform);
        this.setState({
        editorState,
        contentState: editorState.getCurrentContent(),
        });
        this.state.brief.narrative = markup;
        this.brief.narrative = this.state.brief.narrative;
    };

    render() {
        const { editorState } = this.state;
            return (
                <Form onSubmit={this.formSubmit}>
                    <Editor
                    editorState={editorState}
                    toolbarClassName = "toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={this.onEditorStateChange}
                />
                </Form>
            )
    }


}

const condition = role => role > 0

export default withAuthorization(condition)(DesignerEditor);
