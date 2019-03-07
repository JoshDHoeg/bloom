import { BehaviorSubject } from 'rxjs';
import { User } from '../../constants/database';
import FirebaseBase from './firebaseBase';
import Firebase from '..';

class FirebaseAuthUser extends FirebaseBase {
  _userCred;
  user;
  _userProvider;
  _isAuthent = new BehaviorSubject(null);
  _isAuth = new BehaviorSubject(null);
  get isAuth() {
    return this._isAuth.getValue();
  }
  set isAuth(authStatus) {
    if (authStatus && this.user) {
      this._isAuth.next(authStatus);
      this._isAuthent.next(!this.user.client);
    } else if (!authStatus) this._isAuth.next(authStatus);
    // console.log(authStatus, this.user);
  }
  get isAuthorized() {
    return this._isAuth.asObservable();
  }
  get isAuthenticated() {
    if (Firebase.isDesignerOverride)
      return this._isAuth.asObservable();
    return this._isAuthent.asObservable();
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

  doCreateUserWithEmailAndPassword = (email, password, client = true, name = 'username', phone = '1231231234', project = 'randomkey') => {
    return this.auth.createUserWithEmailAndPassword(email, password).catch(error => {
      console.warn(error);
      return false;
    })
      .then(usr => {
        if (!usr)
          return false;
        return usr.user.updateProfile({
          displayName: name,
          photoURL: ''
        })
          .then(val => {
            console.log(val);
            return this.doSetUser(usr.user.uid, name, email, phone, client, [project])
          }).catch(error => {
            console.error(error);
            return false;
          });
      });
  }

  doRemoveUser = () => {
    this.usersRef.doc(this.auth.currentUser.uid).delete()
      .then(() => this.auth.currentUser.delete());
  }

  doSignInWithEmailAndPassword = (email, password) => {
    return this.auth.signInWithEmailAndPassword(email, password).then(result => {
      this._userCred = result.credential;
      //console.log(result);
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

  doSetUser = async (uid = '', name = '', email = '', phone = '', client = false, projectUid = ['', ['', false]]) => {
    console.log(uid, name, email, phone, client, projectUid);
    const projects = await Promise.all(projectUid.map(p => {
      if (Array.isArray(p))
        return this.doGetProject(p[0], p[1]).then(p => p.uid);
      return this.doGetProject(p).then(p => p.pid);
    }));
    return this.usersRef.doc(uid).set({
      client: client,
      email: email,
      name: name,
      phone: phone,
      projects: projects
    }).then(() => uid).then(this.doGetUser.bind(this, uid, false));
  }

  doGetUser = (uid, failSafe = Firebase.getUserFailSafe)  => {
    const uuid = failSafe ? 'userAuthID' : uid;
    return this.usersRef.doc(uuid).get().then(userData => {
      if (userData.exists)
        return new User(userData);
      else
        console.error('user does not exist');
      return false;
    }).catch(error => {
      console.warn(error);
    })
  }

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
