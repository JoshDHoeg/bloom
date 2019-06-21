import React, {Component} from 'react'
import{ Editor } from 'react-draft-wysiwyg'
import {EditorState} from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { withAuthorization } from '../../utilities/Session';



class Editors extends Component {
    draft;
    final;
    revision;
    stage;
    constructor(props){
        super(props);
        this.state = {

        }
        this.state = {editorState: EditorState.createEmpty()};
        this.onEditorStateChange = (editorState) => this.setState({editorState});
    }


    onEditorStateChange = (editorState) => {
        this.setState({
          editorState,
        });
      };


    render(){
        const { contentState } = this.state;
        return(
            <Editor
            editorState={this.state.editorState}
            //toolbarClassName='toolbarClassName'
            //wrapperClassName='wrapperClassName'
            //editorClassName='editorClassName'
            onChange={this.onEditorStateChange}
            />
        )
    }
}

const condition = role => role > 0

export default withAuthorization(condition)(Editors);
