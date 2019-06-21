import React, {Component} from 'react';
import DesignerNavigation from '../DesignerNavigation';
import UserNavigation from '../UserNavigation';
import { withAuthorization } from '../../../utilities/Session';
import Loading from '../../Loading/Loading'
class NavigationToggle extends Component {
    user;
    concept;
    stage;
    constructor(props){
        super(props);
        this.state={
            loading: true,
            user:{
                isDesigner: false
            },
            concept:{
                approved: '',
                completed: false,
                approveTerms: false,
            },
            stage:{
                stage: ''
            }
        }
    }
    componentDidMount() {
        this.setState({ loading: true, edit: this.props.edit });
        this.getUserState();
        this.getProjectState();
    }
    getProjectState = async () => {
        const project = await this.props.firebase.doGetProject(this.props.firebase.user.uid, this.props.firebase.activeProject, true);
        this.stage = await project.stage;
        this.concept = await project.concept;
        //const schedule = await this.project.concept.schedule;
        const state = await {
            loading: false,
            stage: {
                stage: this.stage.stage,
                rcount: this.stage.rcount
            },
            concept:{
                ...this.concept.getAll()
            }
        }
        this.setState(state);
        return state;
    }

    getUserState = async () => {
        const user = await this.props.firebase.doGetUser(this.props.firebase.user.uid);
        this.user = await user
        const state = await {
            loading: false,
            user: {
                isDesigner: this.user.isDesigner
            },
        }
        this.setState(state);
        return state;
    }
    render() {
        if(this.state.loading){
            return <Loading />
        } else if(this.state.user.isDesigner){
            return(
                <div>
                    <DesignerNavigation/>
                </div>
            )
        }else{
            return(
                <div>
                    <UserNavigation concept={this.state.concept} stage={this.state.stage}/>
                </div>
            )
        }
    }
}
const condition = role => role > 0;

export default withAuthorization(condition)(NavigationToggle)


