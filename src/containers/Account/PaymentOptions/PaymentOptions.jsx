// BLOOMTIME DESIGN 2019
import React, {Component} from 'react'
import { withAuthorization } from '../../../utilities/Session';
import PaymentPageView from './View/View';
import PaymentPageEdit from './Edit/Edit';

//IMPORT CONTAINERS


class PaymentInfoPage extends Component {
    user; 
    constructor(props) {
        super(props);
        this.state = { 
            loading: false,
            edit: false,
            user:{
                billadd1: '',
                zip: '',
                city: '',
                state:'',
            }
        };
    this.formSubmit = this.formSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    }

    formSubmit = () => {
        this.user.billadd1 = this.state.user.billadd1;
        this.user.zip = this.state.user.zip;
        this.user.city = this.state.user.city;
        this.user.state = this.state.user.state;
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
    }

    componentDidMount(){
        this.setState({ loading: true, edit: this.props.edit});
        this.getUserState();
  
    }
    
    getUserState = async () => {
        const user = await this.props.firebase.doGetUser(this.props.firebase.user.uid, true);
        this.user = await user
        console.log('user3:', user);
        const state = await {
            loading: false,
            user: {
                billadd1: this.user.billadd1,
                zip: this.user.zip,
                state: this.user.state,
                city: this.user.city,
            },
        }
        this.setState(state);
        return state;
    }

    render() {
        console.log(this.state);
        if(this.state.edit){
            return(
                <PaymentPageEdit 
                formSubmit={this.formSubmit}
                handleChange={this.handleChange}
                user={this.state.user}
                />
            );
        }else{
            return (
                <PaymentPageView 
                user={this.state.user}
                />
            );
        }
    }
}
const condition = authUser => !!authUser;

export default withAuthorization(condition)(PaymentInfoPage);