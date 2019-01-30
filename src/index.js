// BLOOMTIME DESIGN 2019
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import AuthRouter from './AuthRouter.jsx';

//IMPORT STYLES
import './index.css';
import 'semantic-ui-css/semantic.min.css'

//IMPORT UTILITIES
import Firebase, { FirebaseContext } from './utilities/Firebase';

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <AuthRouter />
  </FirebaseContext.Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
