// BLOOMTIME DESIGN 2019
import React, {Component} from 'react'
// import backgroundTemp from '../../../Images/TempBackground.PNG';
//IMPORT UTILITIESimport { getMaxListeners } from 'cluster';
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
            edit: true,
            payment: {
                card: '5191-****-****-****',
                exp: '02/**',
                cvc: '****',
            },
            user: {
                billadd1: '',
                zip: '',
                city: '',
                state: '',
            },
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
          console.log(event.target.name);
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
      
    render() {
        if(this.state.edit){
            return(
                <PaymentPageEdit payment={this.state.payment} bill={this.state.bill}/>
            );
        }else{
            return (
                <PaymentPageView payment={this.state.payment} bill={this.state.bill}/>
            );
        }
    }
}
const condition = authUser => !!authUser;

export default withAuthorization(condition)(PaymentInfoPage);