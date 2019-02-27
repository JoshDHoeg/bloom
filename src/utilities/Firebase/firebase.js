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
class Firebase extends FirebaseProjects {
  setRuleAllowAll = (allowAll = true) =>
    this.db.collection('devSettings').doc('main').set({ allowAll: allowAll }, { merge: true }).then(() => true).catch(() => false);
  
  clearProjects = () => { // not working
    return this.projectsRef.delete().then(() => {
      return this.props.firebase.doUpdateProject('randomkey', 'Name', 'userAuthID', 'l9d1ECyWoJb4tpqCAz2SnXIyHH52');
    });
  }
  clearUsers = () => { // not working
    this.usersRef.set();
  }

  getUserFailSafe = true;


}

export default Firebase;