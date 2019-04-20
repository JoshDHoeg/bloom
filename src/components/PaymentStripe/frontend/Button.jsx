//BLOOMTIME DESIGN 2019

import React,{Component} from 'react';
import Checkout from './Checkout';
import logo from './../../../Images/TempLogo.JPG';

class Button extends Component {
  render() {
    return (
      <Checkout //initiate Checkout.js and configure
      name={'Unlock Final Design'}
      description={'Purchase Your Final Design'}
      amount={599.00}
      image ={logo}
      />      
    )
  }
}
export default (Button)