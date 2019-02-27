import { BehaviorSubject } from 'rxjs';
import { User } from '../../constants/database';
import FirebaseBase from './firebaseBase';

class FirebaseAuthUser extends FirebaseBase {
  _userCred;
  user;
  _userProvider;
  _isAuth = new BehaviorSubject(null);
  get isAuth() {
    return this._isAuth.getValue();
  }
  set isAuth(authStatus) {
    if (authStatus && this.user)
      this._isAuth.next(authStatus);
    else if (!authStatus) this._isAuth.next(authStatus);
    // console.log(authStatus, this.user);
  }
  get isAuthenticated() {
    return this._isAuth.asObservable();
  }
  constructor() {
    super();
    this.auth.onAuthStateChanged(user => {
      if (user) {
        this.doGetUser(user.uid)
          .then(user => {
            this.user = user;
            if (this.user)
              return user.email;
            throw new Error('getting user failed');
          })
          .then(email => this.auth.fetchSignInMethodsForEmail(email))
          .then(provider => this._userProvider = provider)
          .then(() => true)
          .catch(error => {
            console.warn(error);
            return false;
          }).then(success1 => {
            // console.log(success1, this._userProvider);
            return success1;
          })
          .then(success => this.isAuth = success);
        // this.isAuth = true;
      }
    })
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);
  //TODO: add create new project

  doSignInWithEmailAndPassword = (email, password) => {
    return this.auth.signInWithEmailAndPassword(email, password).then(result => {
      this._userCred = result.credential;
      console.log(result);
      return true;
    }, error => {
      console.warn(error);
      if (error.message === 'The password is invalid or the user does not have a password.')
        this.auth.auth.fetchSignInMethodsForEmail(email).then(providers => {
          if (providers.includes('google.com'))
            this._signInWithGoogle();
          else if (providers.includes('facebook.com'))
            this._signInWithFacebook();
        });
      return false;
    })

  }
  _doSignInWithGoogle = () => {
    return this.auth.auth.signInWithPopup(new this.auth.GoogleAuthProvider()).then(result => {
      this.userCred = result.credential;
      this._userProvider = ['google.com'];
      return true;
    }, error => {
      console.log(error);
      return false;
    });
  }

  _doSignInWithFacebook = () => {
    return this.auth.signInWithPopup(new this.auth.FacebookAuthProvider()).then(result => {
      this.userCred = result.credential;
      this._userProvider = ['google.com'];
      return true;
    }, error => {
      console.warn(error);
      return false;
    });
  }

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);
  
  doSetUser = (uid = '', name = '', email = '', phone = '', client = false, projectUid = ['', ['', false]]) => {
    const projects = projectUid.map(p => {
      if (Array.isArray(p))
        return this.doGetProject(p[0], p[1]);
      return this.doGetProject(p);
    });
    this.usersRef.doc(uid).set({
      client: client,
      email: email,
      name: name,
      phone: phone,
      projects: projects
    });
  }
  
  doGetUser = uid =>
    this.usersRef.doc(uid).get().then(userData => {
      if (userData.exists)
        return new User(userData);
      else
        console.error('user does not exist');
      return false;
    }).catch(error => {
      console.warn(error);
    })

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

  offfUser = (userSubscription = null) => {
    if (userSubscription) userSubscription.unsubscribe();
    this._userSub();
    this._users.next([]);
  }
}
export default FirebaseAuthUser;