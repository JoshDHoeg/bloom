//BLOOMTIME DESIGN 2019

import React,{Component} from 'react';
import Checkout from './Checkout';
import logo from './../../../Images/TempLogo.JPG';

<<<<<<< HEAD
const Button = (props) => (
=======
class Button extends Component {
  render() {
    return (
>>>>>>> 56a5ed899c5775f76634bc9d54ec44514c16956c
      <Checkout //initiate Checkout.js and configure
      label={'Purchase Final Design'}
      name={'Purchase Your Final Design'}
      description={'$599 per area up to 1,000 sq. feet'}
      amount={599.00}
      image ={logo}
<<<<<<< HEAD
      billingAddress={true}
      SuccessPayment = {props.SuccessPayment}
      />     
)
=======
      />      
    )
  }
}
>>>>>>> 56a5ed899c5775f76634bc9d54ec44514c16956c
export default (Button)