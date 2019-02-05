// BLOOMTIME DESIGN 2019
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import { User, Project } from '../constants/database';
import { BehaviorSubject } from 'rxjs';

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


/** Usage Guide
 * * User
 * user = (<uid>) => Promise<User>
 *  this.props.user(uid).then(user => <yourFunction>)
 * onUser = () => Subscription<User[]>
 *  this.userSub = this.props.firebase.onUser().subscribe(users => <yourFunction>)
 * onUser = (<Subscription<User[]>) => void
 *  this.props.firebase.onUser(this.userSub)
 * 
 * * Project
 * project(<id||uid, true>) => Promise<Project>
 *  this.props.firebase.project(id).then(project => {
 *    project.client.then(client => <yourFunction>);
 *  });
 */
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

  user = uid =>
    this.usersRef.doc(uid).get().then(userData => new User(userData));

  _userSub; _users = new BehaviorSubject([]); // private
  get users() { return this._users.getValue() };
  onUser = (unsub = null) => {
    if (this._userSub) this.offfUser(unsub);
    if (!unsub) {
      this._userSub = this.usersRef.onSnapshot(userQuery =>
        userQuery.forEach(userData => this._users.next([].concat(this.users, new User(userData))))
      );
      return this._users.asObservable();
    }
  }

  offfUser(userSubscription = null) {
    if (userSubscription) userSubscription.unsubscribe();
    this._userSub();
    this._users.next([]);
  }

    // ** Project API **
  get projects() {
    return this.projectsRef.get().then(projs => projs.docs.map(proj => new Project(proj)));
  }

  project = (id, isUID = false) => { // return Promise<Project>
    if (isUID)
      return this.user(id).then(userData => this.project(userData.projects[0].id));
    else
      return this.projectsRef.doc(id).get().then(data => new Project(data));
  }
}

export default Firebase;
