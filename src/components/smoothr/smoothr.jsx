// Cannot implement smoothr yet due to version incompatability, this file will be used once we move to new version of react


import React from 'react';
import ReactDOM from 'react-dom';

// Bring in the Smoothr components
import { Smoothr, SmoothRoutes, Route, Link } from 'smoothr';


const slideRight = (rightArrow) => {
    let an

}


const rightArrow = {
    'Slide Right (JS)': {
        in: [
          { transform: 'translate3d(100%, 0, 0)' },
          { transform: 'translate3d(0, 0, 0)' }
        ],
        out: [
          { transform: 'translate3d(0, 0, 0)' },
          { transform: 'translate3d(-100%, 0, 0)' }
        ],
        reverseIn: [
          { transform: 'translate3d(-100%, 0, 0)' },
          { transform: 'translate3d(0, 0, 0)' }
        ],
        reverseOut: [
          { transform: 'translate3d(0, 0, 0)' },
          { transform: 'translate3d(100%, 0, 0)' }
        ]
      }

}

const easing =[
    'ease-in-out', //this one
    'ease-in,',
    'ease-out',
    'ease',
    'linear',
];