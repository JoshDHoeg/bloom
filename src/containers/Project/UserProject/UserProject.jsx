import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Icon, Menu, Segment, Step } from 'semantic-ui-react'

//IMPROT UTILITIES
import { withAuthorization } from '../../../utilities/Session';
import * as ROUTES from "../../../utilities/constants/routes";

import Concept from './Concept/Concept';
import Contractors from './Contractors/Contractors';
import Final from './Final/Final';
import Revision from './Revision/Revision';
import Draft from './Draft/Draft';


//concept => draft => final => revision => contractors
class UserProject extends React.Component {
    stage;
    constructor(props){
        super(props);
        this.state = {
            stage: {
                stage: '',
            },
            route: '',
            component: ''
        }
    }

    componentDidMount(){
        this.setState({ loading: true })
        if(this.props.location.state){
            this.setState({projectIndex: this.props.location.state.projectIndex});
            this.getProjectState(this.props.location.state.projectIndex);
        }else{
            this.setState({projectIndex: 0});
            this.getProjectState(0)
        }
    }

    getProjectState = async () => {
        const project = await this.props.firebase.doGetProject(this.props.firebase.user.uid, this.props.firebase.activeProject, true);
        this.stage = await project.stage;
        console.log(this.stage)
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
        console.log('?', this.state.stage.stage)
        if(this.state.stage.stage === "concept"){
                this.state.component = Concept
        }else if(this.state.stage.stage === "draft"){
                this.state.component = Draft
        }else if(this.state.stage.stage === 'final'){
                this.state.component = Final
        }else if(this.state.stage.stage === 'revision'){
                this.state.component = Revision
        }else if(this.state.stage.stage === 'contractors'){
                this.state.component = Contractors
        }
        console.log(this.state.component)
        return(
            <Router>
                <Segment basic>
                    <div>
                        <Route exact path={ROUTES.PROJECT} component={this.state.component} /> 
                        <Route exact
                               path={ROUTES.CONCEPT}
                               render={(props) => <Concept {...props} edit={false} index={props.location.state} /> }
                        />
                        <Route exact
                               path={ROUTES.CONTRACTORS}
                               render={(props) => <Contractors {...props} edit={false} /> }
                        />
                        <Route exact
                               path={ROUTES.FINAL}
                               render={(props) => <Final {...props} edit={false} /> }
                        />
                        <Route exact
                               path={ROUTES.REVISION}
                               render={(props) => <Revision {...props} edit={false} /> }
                        />
                        <Route exact
                               path={ROUTES.DRAFT}
                               render={(props) => <Draft {...props} edit={false} /> }
                        />
                    </div>
                </Segment>
            </Router>
        )
    }
}

const condition = role => role > 0;
export default withAuthorization(condition)(UserProject);
