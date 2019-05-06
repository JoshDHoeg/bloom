//BLOOMTIME DESIGN 2019

import React,{Component} from 'react';
import Checkout from './Checkout';
import logo from './../../../Images/TempLogo.JPG';

const Button = (props) => (
      <Checkout //initiate Checkout.js and configure
      label={'Purchase Final Design'}
      name={'Purchase Your Final Design'}
      description={'$599 per area up to 1,000 sq. feet'}
      amount={599.00}
      image ={logo}
      billingAddress={true}
      SuccessPayment = {props.SuccessPayment}
      />     
)
export default (Button)