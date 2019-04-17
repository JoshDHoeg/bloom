// BLOOMTIME DESIGN 2019
import React, {Component} from 'react'
import backgroundTemp from '../../../Images/TempBackground.PNG';
//IMPORT UTILITIESimport { getMaxListeners } from 'cluster';
import { withAuthorization } from '../../../utilities/Session';
import PaymentPageView from './View/View';
import PaymentPageEdit from './Edit/Edit';
//IMPORT CONTAINERS


class PaymentInfoPage extends Component {
    //this is an example set-up for when firebase has this information
    //constructor(props) {
    //    super(props);
    //    this.state = { 
    //        loading: false,
    //        edit: false,
    //        card: '',
    //        exp: '',
    //        cvc: '',
    //        billadd: '',
    //        zip: '',
    //        city: '',
    //        state:'',
    //    };
   // }

    //componentDidMount() {
    //    this.setState({ loading: true, edit: this.props.edit });
    //    this.getUserState();
    //}

    //getUserState = async () => {
    //    const user = this.props.firebase.user;
    //    const state = {
    //        loading: false,
    //        card: user.name,
    //        exp: user.email,
    //        cvc: user.phone,
    //        billadd: user.billadd,
    //        zip: user.zip,
    //        city: user.city,
    //        state: user.state,
    //    }
    //    this.setState(state);
    //    return state;
    //}
constructor(props) { {/*temperary props until firebase is setup*/}
        super(props);
        this.state = {
            loading: false,
            edit: true,
            payment: {
                card: '5191-****-****-****',
                exp: '02/**',
                cvc: '****',
            },
            bill: {
                add: '700 Mountain Drive',
                zip: '1234',
                city: 'Denver',
                state: 'Colorado',
            },
        };
      }
      componentDidMount(){
          this.setState({ loading: true, edit: this.props.edit});
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