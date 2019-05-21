// BLOOMTIME DESIGN 2019
import React, {Component} from 'react'
// import backgroundTemp from '../../../Images/TempBackground.PNG';
//IMPORT UTILITIESimport { getMaxListeners } from 'cluster';
import { withAuthorization } from '../../../utilities/Session';
import PreferencesPageView from './View/View';
import PreferencesPageEdit from './Edit/Edit';
//IMPORT CONTAINERS

//briefs[0].profile. / edging / form / ground / spacing / variety

class AccountPreferencesPage extends Component {
    profile;
    budget;
    brief;

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            edit: true,
            profile: {
                edging: '',
                form: '',
                ground: '',
                spacing: '',
                variety: ''
            },
            budget: ''
        };
        this.formSubmit = this.formSubmit.bind(this);
        this.handleChangeProf = this.handleChangeProf.bind(this);
        this.handleChangeBudget = this.handleChangeBudget.bind(this);
    }

    formSubmit = () => {
        console.log("form submitted");
        console.log(this.state.profile);
        console.log(this.state.budget);
        this.brief.doSetBudget(this.state.budget);
        this.brief.doSetProfile(this.state.profile);
        // this.profile = this.state.profile; //should set profile in database
        // this.budget = this.state.budget;

    }

    handleChangeProf(event) {
        console.log("handleChange called");
        event.preventDefault();
        console.log(event.target.name);
        this.setState({
            ...this.state,
            profile: {
                ...this.state.profile,
                [event.target.name]: event.target.value
            }
        });
        console.log(this.state);
    }

    handleChangeBudget(event){
        console.log("handleChange called");
        event.preventDefault();
        console.log(event.target.name);
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    componentDidMount(){
          this.setState({ loading: true, edit: this.props.edit});
          this.getProjectState();
    }

    getProjectState = async () => {
        console.log("here");
        var project = await
            this.props.firebase.doGetProject(this.props.firebase.user.uid, this.props.firebase.activeProject, true);
        console.log(project);
        this.brief = await project.brief;
        console.log(this.brief);
        this.profile = await this.brief.profile;
        this.budget = await this.brief.budget;
        console.log(this.profile);
        console.log(this.budget);
        const state = await {
            project: project,
            profile: this.profile,
            budget: this.budget,
            loading: false
        }
        this.setState(state);
        return state;
    }

    render() {
        if(this.state.edit){
            return(
                <PreferencesPageEdit
                     formSubmit={this.formSubmit}
                     handleChangeBudget={this.handleChangeBudget}
                     handleChangeProf={this.handleChangeProf}
                     info={this.state}
                />
            );
        }else{
            return (
                <PreferencesPageView info={this.state}/>
            );
        }
    }
}
const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPreferencesPage);

