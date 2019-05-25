import React from 'react';
import {withAuthorization} from '../../utilities/Session';
import { Step, Icon } from 'semantic-ui-react'

class ProjectStatus extends React.Component {
    constructor(props){
        super(props);
        this.state={
            step: "concept",
            revisions: 2,
            contractors: true
        }
    }

    render(){
        return(
            <Step.Group>
            <Step>
              <Step.Content>
                <Step.Title>Concept Designs</Step.Title>
              </Step.Content>
            </Step>
        
            <Step>
              <Step.Content>
                <Step.Title>Rough Draft</Step.Title>
              </Step.Content>
            </Step>
        
            <Step>
              <Step.Content>
                <Step.Title>Final Draft</Step.Title>
              </Step.Content>
            </Step>

            {this.state.revisions > 0 &&
                <Step>
                    <Step.Content>
                        <Step.Title>Revision</Step.Title>
                    </Step.Content>
                </Step>
            }

            {this.state.revisions > 1 &&
                <Step>
                    <Step.Content>
                        <Step.Title>Revision 2</Step.Title>
                    </Step.Content>
                </Step>
            }

            {this.state.contractors &&
            <Step>
                <Step.Content>
                    <Step.Title>Landscapers</Step.Title>
                </Step.Content>
            </Step>
            }

          </Step.Group>
        )
    }

}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(ProjectStatus);