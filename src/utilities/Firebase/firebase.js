// BLOOMTIME DESIGN 2019
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import FirebaseProjects from './helpers/projects';


/**
 *
 * ### IF *INSUFFICIENT PERMISIONS*
 *
 * `setRuleAllowAll(true)`
 *
 * ### IF *project is missing from database*
 *
 * `this.props.firebase.doUpdateProject('randomkey', 'Name', 'userAuthID', 'l9d1ECyWoJb4tpqCAz2SnXIyHH52');`
 *
 * ## User
 * ***
 * ### **to get a single user:**
 *
 * `doGetUser(<uid>) => Promise<User>`
 *
 * ```javascript
 * doGetUser('authUserID').then(user => ...);
 * ```
 * ___
 * ### **to listen for all users:**
 *
 * `onUser() => Subscription<User[]>`
 *
 * ```javascript
 * this.userSub = this.props.firebase.onUser().subscribe(users => ...)
 * ```
 *
 * You **MUST** set the returned subscription to some var
 * this var is used later in `onComponentWillUnmount` like so:
 * * `onUser(<Subscription<User[]>) => void`
 * ```javascript
 * onUser(this.userSub)
 * ```
 * * * same `userSub` from above
 *
 * ___
 * ### **to set user info**
 * `doSetUser() => void`
 * ```javascript
 * doSetUser();
 * ```
 * * or simply set it in the `User` object itself
 *
 * ___
 * ---
 * ## **Project**
 * ***
 * ### **to get project by project id:**
 * `project(<id>) => Promise<Project>`
 * ```javascript
 * project(id).then(project => {
 *      project.client.then(client => <yourFunction>);
 *    });
 * ```
 */
<<<<<<< HEAD
 class Firebase extends FirebaseProjects {
=======

class Firebase extends FirebaseProjects {
>>>>>>> jesse
  setRuleAllowAll = (allowAll = true) =>
    this.db.collection('devSettings').doc('main').set({ allowAll: allowAll }, { merge: true }).then(() => true).catch(() => false);

  clearProjects = () => { // I promise this won't break anything. If this fails for some reason, call an empty createProject() and then try this again
    this._deleteAll(this.projectsRef, true, true);
    setTimeout(() => {
      this.doUpdateProject('Name', 'userAuthID', 'l9d1ECyWoJb4tpqCAz2SnXIyHH52', 'randomkey');
    }, 1500);
  }
  clearUsers = () => { // DO NOT CALL
    if (false) {
      const listener = this.usersRef.onSnapshot(users => {
        users.forEach(u => u.set());
      });
      setTimeout(() => {
        listener();
      }, 1000);
    }
  }

  static preventBreakingChanges = false; // for personal testing with db changes (keep false)
  static useDefaultProjectValues = false; // for creating projects
  static getUserFailSafe = false; // gets the db testing user
  static isDesignerOverride = true; // spoof the current user to designer status
  static isClientOverride = false; // spoof current user to client status


}

export default Firebase;
