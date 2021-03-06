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

// const devConfig = {
//   apiKey: "AIzaSyC-ebwUdI1SzTeXbYF4ZCmroIDjdLQdmKo",
//   authDomain: "bloomprod-112b6.firebaseapp.com",
//   databaseURL: "https://bloomprod-112b6.firebaseio.com",
//   projectId: "bloomprod-112b6",
//   storageBucket: "bloomprod-112b6.appspot.com",
//   messagingSenderId: "1004815344143",
// };

//jesses test database:

// var devConfig = {
//     apiKey: "AIzaSyBccXEAqEbvDPL346t_Jv39xSZn4VfzLis",
//     authDomain: "testing-8e700.firebaseapp.com",
//     databaseURL: "https://testing-8e700.firebaseio.com",
//     projectId: "testing-8e700",
//     storageBucket: "testing-8e700.appspot.com",
//     messagingSenderId: "708240096333"
// };

const config =
  process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

class FirebaseBase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
    this.usersRef = this.db.collection('users');
    this.projectsRef = this.db.collection('projects');
    this.channelsRef = this.db.collection('channels');
    this.messagesRef = this.db.collection('messages');
  }

  // For all class objects like User and Project, console.log them to see vars.
  // For all classes, pls do not use the _varName. the only varName will update the database
  user; // The current User object
  isAuth; // boolean // user is auth - pls consult me as further inplementation is underway
<<<<<<< HEAD
  doCreateUserWithEmailAndPassword = (email, password, client, name, phone, project, billadd1, zip, city, state, role, isAdmin, Emaillist) => null; // Promise<User>
=======
  doCreateUserWithEmailAndPassword = (email, password, client, name, phone, project, billadd1, zip, city, state, role, isAdmin, Emaillist, active, tour1, tour2) => null; // Promise<User>
>>>>>>> 2c9a7fdb3c6d40e041db2efd69cf725d637e7afa
  // only call once email and passowrd are mandatory
  doRemoveUser = () => null; //  Promise<success> // removes current user
  doSignInWithEmailAndPassword = (email, password) => null; // Promise<success>
  doSignOut = () => null; // Promise<success>
  doPasswordReset = (email) => null; // Pomise<success>
  doPasswordUpdate = (password) => null; // Promise<success>
<<<<<<< HEAD
  doSetUser = (uid, name, email, phone, client, projectUid, billadd1, zip, city, state, role, isAdmin, Emaillist) => null; // Promise<User> // update a user using the uid
=======
  doSetUser = (uid, name, email, phone, client, projectUid, billadd1, zip, city, state, role, isAdmin, Emaillist, active, tour1, tour2) => null; // Promise<User> // update a user using the uid
>>>>>>> 2c9a7fdb3c6d40e041db2efd69cf725d637e7afa
  // ALL parameters are mandatory
  doGetUser = (uid) => null; // User // get user using the uid
  onUser = (unsub = null) => null // Subscription<User[]> // call to listen for users
  // PLEASE set the returned subscription to variable and use a described below
  offfUser = (userSubscription = null) => null; // void // use the onUser variable from above as the userSubscription
  // call this in the componentWillUnmount to prevent dataleak
  setActiveProject = (index) => null;
  projects; // Promise<Project[]> // this is a single call for all projects
  doGetProject = (pid, index, isUID = false) => null;
  doGetProjects = (uid) => null;
  // Promise<Project> // calling with pid will get project by id
  // * optimal usage example: this.props.firebase.doGetProject(this.props.firebase.user.uid, true)
  // calling with isUID = true will find a user's project
  // User can have multiple projects -- isUID will return the first project
  doCreateRevision = (pid, revisionCount, index, isUID = false) => null;
  doUpdateProject = (name, clientUid, designerUid, projectId = null, returnProject = true) => null; // Promise<Project>
  // Will update a project
  // if no projectId is given: will create new project
  /// Can be called completely empty to create a test Project
  // All parameters are optional

}
export default FirebaseBase;
