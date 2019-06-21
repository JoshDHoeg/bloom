import { BehaviorSubject } from 'rxjs';
import { User } from '../../constants/database';
import FirebaseBase from './firebaseBase';
import Firebase from '..';

class FirebaseAuthUser extends FirebaseBase {
  _userCred;
  user;
  activeProject = 0;
  activeChannel = 0;
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
      return this._isAuth.asObservable(); //defaults to here for now
    return this._isAuthent.asObservable();
  }

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();
            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = {};
            }
            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              role: authUser.role,
              ...dbUser,
            };
            next(authUser);
          });
      } else {
        fallback();
      }
    });


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
           this.isAuth = true;
      }
    })
  }

  //most of old onAuthStateChanged logic (from the constructor) was moved to this function. Called by doCreateUser... and doSignInUser...
  setFirebaseVars = id => {
      return this.doGetUser(id)
          .then(user => {
              this.user = user;
              console.log("just set user var");
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
              return success1;
          })
          .then(success => {
              this.isAuth = success;
              return success;
          });
  }

  doCreateUserWithEmailAndPassword = (email, password, project = 'randomkey', channelRef = null, name = 'username',
                                      isDesigner = false,isEmaillist = true, isAdmin = false, phone = '1231231234',
                                      billadd1 = 'Default Address', zip = 'Default Zip Code', city = 'Default City',
                                      state = 'Default State', role = 1) => {
    console.log("here yo");
    return this.auth.createUserWithEmailAndPassword(email, password).catch(error => {
      console.warn(error);
      return false;
    })
      .then(usr => {
        console.log("here2");
        console.log(usr);
        if (!usr){
          return false;
        }
        console.log("here3");
        return this.doSetUser(usr.user.uid, name, email, phone, isDesigner,isEmaillist, isAdmin, channelRef, [project], billadd1, zip, city, state, role)
            .then(ref  => {
              return this.setFirebaseVars(ref.id).then(res => {
                  return ref;
              })
            });
    });
  }

  doSignInWithEmailAndPassword = (email, password) => {
    return this.auth.signInWithEmailAndPassword(email, password).then(result => {
      this._userCred = result.credential;
      return this.setFirebaseVars(result.user.uid);
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

  doRemoveUser = () => {
      this.usersRef.doc(this.auth.currentUser.uid).delete()
          .then(() => this.auth.currentUser.delete());
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

//modified doSetUser to return the relevant user id after it creates the user object for callbacks
  doSetUser = async (uid = '', name = '', email = '', phone = '', isDesigner = false, isEmaillist = true, isAdmin = false, channelRef = null,
                     projectUid = ['', ['', false]], billadd1 = '', zip = '', city = '', state = '', role = '') => {
    const projects = await Promise.all(projectUid.map(p => {
      if (Array.isArray(p)) {
          return this.doGetProject(p[0], p[1]).then(p => p.uid);
      }
      return this.doGetProject(p).then(p => p.pid);
    }));
    console.log(projects);
    return this.usersRef.doc(uid).set({
      helpChannel: channelRef,
      isDesigner: isDesigner,
      isEmaillist: isEmaillist, 
      email: email,
      name: name,
      phone: phone,
      projects: projects,
      billadd1: billadd1,
      zip: zip,
      city: city,
      state: state,
      role: role,
      isAdmin: isAdmin,
    }).then(() => uid ).then( () => {
        this.doGetUser.bind(this, uid, false);
        return this.usersRef.doc(uid);
    });
  }

  doGetUser = (uid, failSafe = Firebase.getUserFailSafe)  => {
    const uuid = failSafe ? 'userAuthID' : uid;
    return this.usersRef.doc(uuid).get().then(userData => {
      if (userData.exists) {
          return new User(userData);
      } else {
          return false;
      }
    }).catch(error => {
      console.warn(error);
    })
  }

  _userSub; _users = new BehaviorSubject([]); // private
  get users() { return this._users.getValue() };

  onUser = (unsub = null) => {
    if (this._userSub) this.offUser(unsub);
    if (!unsub) {
      this._userSub = this.usersRef.onSnapshot(userQuery =>
        userQuery.forEach(userData => this._users.next([].concat(this.users, new User(userData))))
      );
      return this._users.asObservable();
    }
  }

  offUser = (userSubscription = null) => {
    if (userSubscription) userSubscription.unsubscribe();
    this._userSub();
    this._users.next([]);
  }

}
export default FirebaseAuthUser;
