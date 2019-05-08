// BLOOMTIME DESIGN 2019
import React, {Component} from 'react'
// import backgroundTemp from '../../../Images/TempBackground.PNG';
//IMPORT UTILITIESimport { getMaxListeners } from 'cluster';
import { withAuthorization } from '../../../utilities/Session';
import AccountInfoView from './View/View';
import AccountInfoEdit from './Edit/Edit';
//IMPORT CONTAINERS


class AccountInfoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            edit: false,
            name: '',
        };
    }

    componentWillMount() {
        this.setState({ loading: true, edit: this.props.edit });
        this.getUserState();
    }

    getUserState = async () => {
        const user = this.props.firebase.user;
        console.log(user);
        const state = {
            loading: false,
            name: user.name,
            email: user.email,
            phone: user.phone
        }
        this.setState(state);
        return state;
    }

    render() {
        if(this.state.edit){
            return(
                <AccountInfoEdit user={this.state} />
            );
        }else{
            return (
                <AccountInfoView user={this.state}/>
            );
        }
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountInfoPage);
