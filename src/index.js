// BLOOMTIME DESIGN 2019
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import AuthRouter from './AuthRouter.jsx';
import HttpsRedirect from 'react-https-redirect';

//IMPORT STYLES
import './index.scss';
import 'semantic-ui-css/semantic.min.css'

//IMPORT UTILITIES
import Firebase, { FirebaseContext } from './utilities/Firebase';

ReactDOM.render(
  <HttpsRedirect>
    <FirebaseContext.Provider value={new Firebase()}>
      <AuthRouter />
    </FirebaseContext.Provider>
  </HttpsRedirect>,
  document.getElementById('root')
);

serviceWorker.unregister();
