//BLOOMTIME DESIGN 2019

import React, {Component} from 'react';
import DesignerNavigation from './DesignerNavigation';
import UserNavigation from './UserNavigation';
import { withAuthorization } from '../../utilities/Session';

class Navigation extends Component {
    user;
    constructor(props){
        super(props);
        this.state={
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
        console.log('user3:', user);
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
        if(this.state.user.isDesigner){
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

export default withAuthorization(condition)(Navigation);
