// BLOOMTIME DESIGN 2019
import React, {Component} from 'react'
// import backgroundTemp from '../../../Images/TempBackground.PNG';
//IMPORT UTILITIESimport { getMaxListeners } from 'cluster';
import { withAuthorization } from '../../../utilities/Session';
import AccountInfoView from './View/View';
import AccountInfoEdit from './Edit/Edit';
//IMPORT CONTAINERS


class AccountInfoPage extends Component {
    user;

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            email: '',
            loading: false,
            edit: false
        };

        this.formSubmit = this.formSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    formSubmit = () => {
        console.log("form submitted");
        console.log(this.state);
        this.user.name = this.state.name;
        this.user.email = this.state.email;
        this.user.phone = this.state.phone;
    }

    handleChange(event) {
        console.log("handleChange called");
        event.preventDefault();
        console.log(event.target.name);
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    componentWillMount() {
        this.setState({ loading: true, edit: this.props.edit });
        this.getUserState();
    }

    getUserState = async () => {
        //const user = this.props.firebase.user;
        this.user = await this.props.firebase.doGetUser(this.props.firebase.user.uid);
        console.log(this.user);
        const state = {
            loading: false,
            name: this.user.name,
            email: this.user.email,
            phone: this.user.phone
        }
        this.setState(state);
        return state;
    }

    render() {
        console.log(this.state);
        if(this.state.edit){
            return(
                <AccountInfoEdit
                    user={this.state}
                    handleChange={this.handleChange}
                    formSubmit={this.formSubmit}
                />
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
