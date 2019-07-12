import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'; //routing
import { Icon, Menu, Segment, Step } from 'semantic-ui-react' //stuff to make it pretty(ish)
// import { Smoothr, SmoothRoutes, Routes/*, Link*/ } from 'smoothr';

//IMPROT UTILITIES
import { withAuthorization } from '../../../utilities/Session'; //authorization before rerouting
import * as ROUTES from "../../../utilities/constants/routes"; //

import Concept from './Concept/Concept'; //concept page
import Contractors from './Contractors/Contractors'; //contractors to show the user
import Final from './Final/Final'; //final draft page
import Revision from './Revision/Revision'; //revision page(s)
import Draft from './Draft/Draft'; //rough draft page
import HouseVisit from './HouseVisit/HouseVisit'; //house visit information
import Payment from './Payment/Payment'; //payment information
import PopMessage from '../../Messaging/PopMessage'; 

//concept => draft => final => revision => contractors
class UserProject extends React.Component {
    stage;
    constructor(props){
        super(props);
        this.state = {
            stage: {
                stage: '', //no defined stage currently
            },
            route: '', //therefore, no need for route or component
            component: ''
        }
    }

    componentDidMount(){ //once component mounts
        this.setState({ loading: true }) //begin loading
        if(this.props.location.state){ //if state is valid??
            this.setState({projectIndex: this.props.location.state.projectIndex}); //sets state for function
            this.getProjectState(this.props.location.state.projectIndex); //sends current state to getProjectState
        }else{
            this.setState({projectIndex: 0}); //if state isnt valid, project index is 0
            this.getProjectState(0); //sends 0 to getProjectState function
        }
    }

    getProjectState = async () => {
        const project = await this.props.firebase.doGetProject(this.props.firebase.user.uid, this.props.firebase.activeProject, true); //project is given user ID and information on active project
        this.stage = await project.stage; //updates stage of project
        const state = await { 
            loading: false, //waits until done loading
            stage: {
               stage: this.stage.stage //plugs in stage to stage object
            }
        }

        this.setState(state); //sets the state with new value determined above
        return state; //returns the new state of the project
    }

    render(){
        if(this.state.stage.stage === "concept"){ //determines what stage project is in
                this.state.component = Concept //if in concept stage updates component as such, etc.
        }else if(this.state.stage.stage === "draft"){
                this.state.component = Draft
        }else if(this.state.stage.stage === 'final'){
                this.state.component = Final
        // }else if(this.state.stage.stage === 'revision'){
        //         this.state.component = Revision
        }else if(this.state.stage.stage === 'contractors'){ //if user has a final version they are satisfied with, routes to contractor info
                this.state.component = Contractors
        }else{ //if all of these have not been passed, then project is in revision stage, which is a form of a final draft
            this.state.component = Final //therefore, sets component to Final so process does not move on to contractor prematurely
        }
        return(
            
            <div>
            <Router>
                <Segment basic>
                    <div>
                        <Route exact path={ROUTES.PROJECT} component={this.state.component} /> {/*routes to appropriate page?? */}
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
                        <Route exact
                                path={ROUTES.PAYMENT}
                                render={(props) => <Payment {...props} edit={false} /> }
                        />
                        <Route exact
                                path={ROUTES.HOUSE}
                                render={(props) => <HouseVisit {...props} edit={false} /> }
                        />
                        
                    </div>
                </Segment>
            </Router>
            {/* <PopMessage/> */}
            </div>
        )
    }
}

const condition = role => role > 0; //only returns true if user is both role>0 (verified) and !==2 (designer)
export default withAuthorization(condition)(UserProject); //exports user's project if condition is true
