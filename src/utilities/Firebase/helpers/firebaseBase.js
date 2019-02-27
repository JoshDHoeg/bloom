import app from 'firebase/app';
const prodConfig = {
  apiKey: "AIzaSyC-ebwUdI1SzTeXbYF4ZCmroIDjdLQdmKo",
  authDomain: "bloomprod-112b6.firebaseapp.com",
  databaseURL: "https://bloomprod-112b6.firebaseio.com",
  projectId: "bloomprod-112b6",
  storageBucket: "bloomprod-112b6.appspot.com",
  messagingSenderId: "1004815344143",
};

const devConfig = {
  apiKey: "AIzaSyB2yzJhaQ1zy8bkIOVP6gbhNxBvV7Bhd7M",
  authDomain: "bloomdash-aca9f.firebaseapp.com",
  databaseURL: "https://bloomdash-aca9f.firebaseio.com",
  projectId: "bloomdash-aca9f",
  storageBucket: "bloomdash-aca9f.appspot.com",
  messagingSenderId: "327651474050",
};

const config =
  process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

class FirebaseBase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
    this.usersRef = this.db.collection('users');
    this.projectsRef = this.db.collection('projects');
  }

  user; // The current User object
  isAuth; // boolean user is auth
  doCreateUserWithEmailAndPassword = (email, password) => null; // Promise
  doSignInWithEmailAndPassword = (email, password) => null; // Promise
  doSignOut = () => null; // Promise
  doPasswordReset = (email) => null; // Pomise;
  doPasswordUpdate = (password) => null; // Promise;
  doSetUser = (uid, name, email, phone, client, projectUid) => null;
  doGetUser = (uid) => null;
  users;
  onUser = (unsub = null) => null;
  offfUser = (userSubscription = null) => null;


  projects;
  doGetProject = (id, isUID = false) => null;
  doCreateProject = (name, clientUid, designerUid, returnProject) => null;
  doUpdateProject = (projectId, name, clientUid, designerUid, returnProject) => null;


}
export default FirebaseBase;