// BLOOMTIME DESIGN 2019
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import { User, Project, ProjectData } from '../constants/database';
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
 * * ** IF INSUFFICIENT PERMISIONS **
 * * run the function setRuleAllowAll(true)
 *    this.props.firebase.setRuleAllowAll(true)
 * 
 * 
 * * ** User **
 * * user = (<uid>) => Promise<User>
 *    this.props.user(uid).then(user => <yourFunction>)
 * * onUser = () => Subscription<User[]>
 *    this.userSub = this.props.firebase.onUser().subscribe(users => <yourFunction>)
 * * onUser = (<Subscription<User[]>) => void
 *    this.props.firebase.onUser(this.userSub)
 * * setUser = ()
 * 
 * * ** Project **
 * * project = (<id>|<uid, true>) => Promise<Project>
 *    this.props.firebase.project(id).then(project => {
 *      project.client.then(client => <yourFunction>);
 *    });
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
    this.usersRef.doc(uid).get().then(userData => {
      if (userData.exists)
        return new User(userData);
      else
        console.error('user does not exist');
      return false;
    });

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

  setRuleAllowAll = (allowAll = true) =>
    this.db.collection('devSettings').doc('main').set({ allowAll: allowAll }, { merge: true }).then(() => true).catch(() => false);
  
  setUser = (uid = '', name = '', email = '', phone = '', client = false, projectUid = ['',['',false]]) => {
    const projects = projectUid.map(p => {
      if (Array.isArray(p))
        return this.project(p[0], p[1]);
      return this.project(p);
    });
    this.usersRef.doc(uid).set({
      client: client,
      email: email,
      name: name,
      phone: phone,
      projects: projects
    });
  }
  
  _getProjectTemplate = async (name, clientUid, designerUid) => {
    const clientData = await this.usersRef.doc(clientUid).get();
    const designerData = await this.usersRef.doc(designerUid).get();
    return {name: name, client: clientData.ref, designer: designerData.ref}
  }
  _updateProjectData = async (docRef, returnProject) => {
    await docRef.collection(ProjectData.Brief.colRef).doc('0').set({ init: false }, { merge: true });
    await docRef.collection(ProjectData.Concept.colRef).doc('0').set({ init: false }, { merge: true });
    await docRef.collection(ProjectData.Final.colRef).doc('0').set({ init: false }, { merge: true });
    await docRef.collection(ProjectData.Revision.colRef).doc('0').set({ init: false }, { merge: true });
    return docRef;
  }

  createProject = async (name = 'Test Project', clientUid = 'userAuthID', designerUid = 'l9d1ECyWoJb4tpqCAz2SnXIyHH52', returnProject = true) => {
    const newName = name === 'Test Project' ? `Test Project ${ await this.cheekyProjectNaming() }` : name;
    const projectRef = await this._getProjectTemplate(newName, clientUid, designerUid)
      .then(project => this.projectsRef.add(project))
      .then(this._updateProjectData).catch(error => {
        console.error('Error creating project: ', error);
        return false;
      });
    if (projectRef && returnProject)
      return this.project(projectRef.id);
    else return projectRef;
      
  }
  // TODO: this batch write can actually be removed
  updateProject = async (projectId, name, clientUid, designerUid, returnProject = true) => {
    const docRef = this.projectsRef.doc(projectId)
    const projectRef = await this._getProjectTemplate(name, clientUid, designerUid)
      .then(project => docRef.set(project), { merge: true })
      .then(() => docRef).then(this._updateProjectData).catch(error => {
        console.error('Error updating project: ', error);
        return false;
      }
    );
    if (projectRef && returnProject)
      return this.project(projectRef.id);
    else return projectRef;
  }

  cheekyProjectNaming = () => this.projects.then(projects => projects.length > 0 ?
    projects.map(p => parseInt(+p.name.split(/ /).pop()) || 0) : -1)
    .then(n => 1 + Math.max.apply(null, n));
}

export default Firebase;