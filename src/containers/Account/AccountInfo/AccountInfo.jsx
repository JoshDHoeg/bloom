// BLOOMTIME DESIGN 2019
import React, {Component} from 'react'
// import backgroundTemp from '../../../Images/TempBackground.PNG';
//IMPORT UTILITIES
import { withAuthorization } from '../../../utilities/Session';
import AccountInfoView from './View/View';
import AccountInfoEdit from './Edit/Edit';
//IMPORT CONTAINERS


class AccountInfoPage extends Component {
    user;
    constructor(props) {
        super(props);
        this.state = { 
            loading: false,
            edit: false,
            username: '',
            email: '',
            phone: ''
        };
    }

    componentDidMount() {
        this.setState({ loading: true, edit: this.props.edit });
        this.getUserState();
    }

    getUserState = async () => {
        this.user = await this.props.firebase.doGetUser(this.props.firebase.user.uid);
        const state = {
            loading: false,
            user: this.user,
            name: this.user.name,
            email: this.user.email,
            phone: this.user.phone,
        }
        this.setState(state);
        return state;
    }
    render() {
        if(this.state.edit){
            return(
                <AccountInfoEdit 
                name={this.state.name} 
                user={this.state.user}
                phone={this.state.phone}
                email={this.state.email}
                />
            );
        }else{
            return (
                <AccountInfoView 
                name={this.state.name} 
                user={this.state.user}
                phone={this.state.phone}
                email={this.state.email}
                />
            );
        }
    }
}
    
const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountInfoPage);
