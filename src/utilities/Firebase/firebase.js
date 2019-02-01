// BLOOMTIME DESIGN 2019
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

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

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.firestore();
    this.usersRef = this.db.collection('users');
    this.projectsRef = this.db.collection('projects');
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

    // *** User API ***

  user = uid => this.usersRef.doc(uid);
  users = (client = false) => this.usersRef;

    // ** Project API **
  projects = (client = false) => this.projectsRef;
  project = (id, isUID = false) => {
    if (isUID)
      return this.user(id).get().then(userData => userData.data().projects[0].get());
    else return this.projectsRef.doc(id).get();
  }
}

export default Firebase;
