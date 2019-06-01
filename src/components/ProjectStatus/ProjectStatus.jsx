import React from 'react';
import {withAuthorization} from '../../utilities/Session';
import { Step, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class ProjectStatus extends React.Component {
    constructor(props){
        super(props);
        this.state={
            state: "concept",
            revisions: 2,
            contractors: true
        }
    }

    componentDidMount(){
        if(this.props.state){
            this.setState({
                state: this.props.state
            })
        }
    }

    render(){
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

                {this.state.revisions > 0 &&
                    <Step href='/project/user_revision/1' active={this.state.state === 'revisions'}>
                        <Step.Content>
                            <Step.Title>Revision</Step.Title>
                        </Step.Content>
                    </Step>
                }

                {this.state.revisions > 1 &&
                    <Step href='/project/user_revision/2' active={this.state.state === 'revisions2'}>
                        <Step.Content>
                            <Step.Title>Revision 2</Step.Title>
                        </Step.Content>
                    </Step>
                }

                {this.state.contractors &&
                <Step href='/project/user_contractors' active={this.state.state === 'contractors'}>
                    <Step.Content>
                        <Step.Title>Landscapers</Step.Title>
                    </Step.Content>
                </Step>
                }

          </Step.Group>
        )
    }

}

const condition = role => role > 0;
export default withAuthorization(condition)(ProjectStatus);