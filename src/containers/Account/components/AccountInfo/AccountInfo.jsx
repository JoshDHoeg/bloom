// BLOOMTIME DESIGN 2019
import React, {Component} from 'react'
// import backgroundTemp from '../../../Images/TempBackground.PNG';
//IMPORT UTILITIES
import { withAuthorization } from '../../../../utilities/Session';
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
            user:{
                phone: '',
                name: '',
                billadd1: '',
                city: '',
                state: '',
                zip: '',
            }
        };
        this.formSubmit = this.formSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    formSubmit = () => {
        this.user.name = this.state.user.name;
        this.user.phone = this.state.user.phone;
        this.user.billadd1 = this.state.user.billadd1;
        this.user.city = this.state.user.city;
        this.user.state = this.state.user.state;
        this.user.zip = this.state.user.zip;
    }

    handleChange(event) {
        event.preventDefault();
//        console.log(event.target.name);
        this.setState({
            user: {
                ...this.state.user,
                [event.target.name]: event.target.value
            }
        });
        console.log(this.state.user.name)
    }
    
    componentDidMount() {
        this.setState({ loading: true, edit: this.props.edit });
        this.getUserState();
    }

    getUserState = async () => {
        const user = await this.props.firebase.doGetUser(this.props.firebase.user.uid, true);
        this.user = await user
        console.log('user3:', user);
        const state = await {
            loading: false,
            user: {
                phone: this.user.phone,
                name: this.user.name,
                billadd1: this.user.billadd1,
                city: this.user.city,
                state: this.user.state,
                zip: this.user.zip
            },
        }
        this.setState(state);
        return state;
    }

    render() {
        if(this.state.edit){
            return(
                <AccountInfoEdit 
                user={this.state.user}
                handleChange={this.handleChange}
                formSubmit={this.formSubmit}
                />
            );
        }else{
            return (
                <AccountInfoView 
                user={this.state.user}
                />
            );
        }
    }
}
    
const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountInfoPage);
