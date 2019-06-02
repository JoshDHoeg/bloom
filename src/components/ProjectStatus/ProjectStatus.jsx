import React from 'react';
import {withAuthorization} from '../../utilities/Session';
import { Step, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class ProjectStatus extends React.Component {
    stage
    constructor(props){
        super(props);
        this.state={
            state: "concept",
            revisions: 2,
            contractors: true,
            stage: {
                stage: ''
            }
        }
    }

    componentDidMount() {
        this.setState({ loading: true, edit: this.props.edit });
        if(this.props.location.state){
          this.setState({projectIndex: this.props.location.state.projectIndex});
          this.getProjectState(this.props.location.state.projectIndex);
        } else{
          this.setState({projectIndex: 0});
          this.getProjectState(0);
        }
        if(this.props.state){
            this.setState({
                state: this.props.state
            })
        }
    }
    getProjectState = async () => {
        const project = await this.props.firebase.doGetProject(this.props.firebase.user.uid, this.props.firebase.activeProject, true);
        this.stage = await project.stage;
        //const schedule = await this.project.concept.schedule;
        const state = await {
            loading: false,
            stage: {
                stage: this.stage.stage
            }
        }
        this.setState(state);
        return state;
    }


    render(){
        let Revision1;
        let Revision2;
        let Contractors;
        if(this.state.stage.stage === "revision" || this.state.stage.stage === "revision2" || this.state.stage.stage === "contractors"){
            Revision1 =  
                <Step href='/project/user_revision/1' active={this.state.state === 'revisions'} >
                    <Step.Content>
                        <Step.Title>Revision</Step.Title>
                    </Step.Content>
                </Step>
        }if(this.state.stage.stage === "revision2" || this.state.stage.stage === "contractors"){
            Revision2 =  
                <Step href='/project/user_revision/2' active={this.state.state === "revisions2"}>
                    <Step.Content>
                        <Step.Title>Revision2</Step.Title>
                    </Step.Content>
                </Step>
        }
        if(this.state.stage.stage === "contractors"){
            Contractors =  
            <Step href='/project/user_contractors' active={this.state.state === "contractors"}>
                <Step.Content>
                    <Step.Title>Landscapers</Step.Title>
                </Step.Content>
            </Step>
        }
        
        console.log(this.props.state);
        const count = (this.state.contractors) ? 4 + this.state.revisions : 3 + this.state.revisions;
        return(
            <Step.Group widths={count}>
                <Step href='/project/user_concept' active={this.state.state === "concept"}>
                <Step.Content>
                    <Step.Title>Concept Designs</Step.Title>
                </Step.Content>
                </Step>
            
                <Step href='/project/user_draft' active={this.state.state === 'draft'}>
                    <Step.Content>
                        <Step.Title>Rough Draft</Step.Title>
                    </Step.Content>
                </Step>
            
                <Step href='/project/user_final' active={this.state.state === 'final'}>
                <Step.Content>
                    <Step.Title>Final Draft</Step.Title>
                </Step.Content>
                </Step>

                {Revision1}

                {Revision2}

                {Contractors}

          </Step.Group>
        )
    }

}

const condition = role => role > 0;
export default withAuthorization(condition)(ProjectStatus);