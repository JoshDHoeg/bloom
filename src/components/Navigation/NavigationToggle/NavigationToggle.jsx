import React, {Component} from 'react';
import DesignerNavigation from '../DesignerNavigation';
import UserNavigation from '../UserNavigation';
import { withAuthorization } from '../../../utilities/Session';
import Loading from '../../Loading/Loading'
class NavigationToggle extends Component {
    user;
    constructor(props){
        super(props);
        this.state={
            loading: true,
            user:{
                isDesigner: false
            }
        }
    }
    componentDidMount() {
        this.setState({ loading: true, edit: this.props.edit });
        this.getUserState();
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
                    <UserNavigation/>
                </div>
            )
        }
    }
}
const condition = role => role > 0;

export default withAuthorization(condition)(NavigationToggle)