//BLOOMTIME DESIGN 2019

import React,{Component} from 'react';
import Checkout from './Checkout';
import logo from './../../../Images/TempLogo.JPG';

class Button extends Component {
    render () {
      return(
      <Checkout //initiate Checkout.js and configure
      label={'Purchase Final Design'}
      name={'Purchase Your Final Design'}
      description={'$599 per area up to 1,000 sq. feet'}
      amount={599.00}
      image ={logo}
      billingAddress={true}
      SuccessPayment = {this.SuccessPayment}
      />  
      )
      }
 
}
export default (Button)