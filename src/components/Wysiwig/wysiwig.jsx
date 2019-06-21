import React, {Component} from 'react'
import{ Editor, EditorState } from 'react-draft-wysiwyg'
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
            draft:{
                feedback: ''
            },
            final:{
                feedback: ''
            },
            revision:{
                feedback: ''
            },
        }
        this.state = {editorState: EditorState.createEmpty()};
        this.onChange = (editorState) => this.setState({editorState});
    }

    getProjectState = async () => {
        const project = await this.props.firebase.doGetProject(this.props.firebase.user.uid, this.props.firebase.activeProject, true);
        this.final = await project.final;
        this.draft = await project.draft;
        this.revision = await project.revision;
        //const schedule = await this.project.concept.schedule;
        const state = await {
            loading: false,
            final: {
                ...this.final.getAll()
            },
            draft: {
                stage: this.stage.stage,
                rcount: this.stage.rcount
            },
            revision:{
                ...this.concept.getAll()
            }
        }
        this.setState(state);
        return state;
    }

    componentDidMount() {
        this.setState({ loading: true, edit: this.props.edit });
        this.getProjectState();
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
            toolbarClassName='toolbarClassName'
            wrapperClassName='wrapperClassName'
            editorClassName='editorClassName'
            onChange={this.onChange}
            />
        )
    }
}

const condition = role => role > 0

export default withAuthorization(condition)(Editors);
