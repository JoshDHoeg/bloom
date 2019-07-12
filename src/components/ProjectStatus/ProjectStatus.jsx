import React from 'react';
import {withAuthorization} from '../../utilities/Session';
import { Sticky } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import "./styles.scss";
import { makeStyles } from '@material-ui/core/styles';
import {Container} from 'semantic-ui-react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import StepLabel from '@material-ui/core/StepLabel';
import Icon from '@material-ui/core/Icon'
import CircleIcon from "@material-ui/icons/AccountCircleOutlined"


class ProjectStatus extends React.Component {
    stage
    revisions = [];
    constructor(props){
        super(props);
        this.state={
            state: "concept",
            revisions: 2,
            contractors: true,
            stage: {
                stage: ''
            },
            activeStep: 0,
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
        this.revisions = await project.revisions;
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
        let Contractors;
        if(this.state.stage.stage === 'contractors'){
            Contractors = 
            <Step active={this.state.state === 'contractors'}>
                <StepButton href='/project/user_contractors'>
                    <StepLabel>
                         Contractors
                    </StepLabel>
                </StepButton>
            </Step>
        }
        return(
        <Container style={{ paddingRight:'5%', paddingLeft:'10%', maxHeight:'30px', marginTop:'2px'}}>
        <div style={{width:'90%'}}>
            <Stepper nonLinear alternativeLabel>
                <Step active={this.state.state === 'concept'}>
                    <StepButton href='/project/user_concept'>
                        <StepLabel>
                            Concept Design
                        </StepLabel>
                    </StepButton>
                </Step>
                <Step active={this.state.state === 'draft'}>
                    <StepButton href='/project/user_draft'>
                        <StepLabel>
                            Rough Draft
                        </StepLabel>
                    </StepButton>
                </Step>
                <Step active={this.state.state === 'final'}>
                    <StepButton href='/project/user_final'>
                        <StepLabel>
                            Final Design
                        </StepLabel>
                    </StepButton>
                </Step>
                {this.revisions.map((item, i) => {
                    let number = Number(this.props.currentRevision)
                    var link = '/project/user_revision/' + (i)
                    return(<Step href={link} style={{width:'auto'}} active={i === number} >
                                <StepButton href={link}>
                                    <StepLabel>Revision {i+1} </StepLabel>
                                </StepButton>
                            </Step>);})
                }
                {Contractors}
            </Stepper>
        </div>
        </Container>
        )
    }

}

const condition = role => role > 0;
export default withAuthorization(condition)(ProjectStatus);