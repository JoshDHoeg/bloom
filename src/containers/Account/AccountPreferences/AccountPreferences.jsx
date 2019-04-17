// BLOOMTIME DESIGN 2019
import React, {Component} from 'react'
import backgroundTemp from '../../../Images/TempBackground.PNG';
//IMPORT UTILITIESimport { getMaxListeners } from 'cluster';
import { withAuthorization } from '../../../utilities/Session';
import PreferencesPageView from './View/View';
import PreferencesPageEdit from './Edit/Edit';
//IMPORT CONTAINERS


class AccountPreferencesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            edit: true,
            budget: ''
            };
        }
      componentDidMount(){
          this.setState({ loading: true, edit: this.props.edit});
          this.getProjectState();
      }

      getProjectState = async () => {
        const project = await this.props.firebase.doGetProject('userAuthID', true);
        const briefs = await project.briefs;
        const state = await {
            project: project,
            budget: briefs[3],
            loading: false
        }
        this.setState(state);
        return state;
      }
    
    render() {
        if(this.state.edit){
            return(
                <PreferencesPageEdit budget={this.state.budget} />
            );
        }else{
            return (
                <PreferencesPageView budget={this.state.budget}/>
            );
        }
    }
}
const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPreferencesPage);

