import Firebase from '../Firebase';

export class User {
  _isDesigner = false;
  get isDesigner() { return this._isDesignert; }
  set isDesigner(designer) {
    this.ref.set({ isDesigner: designer });
  }
  _email = '';
  get email() { return this._email; }
  set email(email) {
    this.ref.set({ email: email });
  }
  _name = '';
  get name() { return this._name; }
  set name(name) {
    this.ref.set({ name: name });
  }
  _phone = '';
  get phone() { return this._phone; }
  set phone(phone) {
    this.ref.set({ phone: phone });
  }
  _projects = [];
  get projects() { return this._projects; }
  set projects(projs) {
    this.ref.set({ projects: projs });
  }
  
  get uid() { return this.id };

  constructor(dbQuery) {
    const data = dbQuery.data();
    this._isDesigner = data['isDesigner'];
    this._email = data['email'];
    this._name = data['name'];
    this._phone = data['phone'];
    this._projects = data['projects']; // DocumentReference[]
    this.ref = dbQuery.ref;
    this.id = this.ref.id; // string
  }
}

export class ProjectBase {
  get pid() {
    return this.cols;
  }
  constructor(documentRef) {
    this.cols = documentRef.ref;
    const data = documentRef.data();
    this.name = data['name'];
    this.clientsRef = data['client'];
    this.clientRef = data['client'][0];
    this.designersRef = data['designer'];
    this.designerRef = data['designer'][0];
    if (Firebase.preventBreakingChanges) {
      this.clientRef = data['client'];
      this.designerRef = data['designer'];
    }
  }

  getProjectData = async () => { // For testing and ease of use
    // (this is a single promise, but it is more time consuming & unnecessary when we code split final prod)
    const data = await Promise.all([this.client, this.designer, this.briefs, this.concepts, this.drafts, this.finals, this.revisions]);
    return data.reduce((d, item, i) => {
      d[Array.isArray(item) ? item[0].constructor.name : item.constructor.name] = item;
      return d;
    }, { name: this.name });
  }
  _getDatabasePromise = (projectData, isRef = false) => {
    const ref = isRef ? projectData : projectData.colRef
    return this.cols.collection(ref).get().then(colSnap => {
      return colSnap.docs.map(doc => new projectData.type(doc, Firebase.useDefaultProjectValues));
    });
  }
  _getUser = (userRef) => {
    console.log(userRef);
    userRef.get().then(res => console.log(res));
    userRef.get().then(userSnap => new User(userSnap));
  }

  get clients() {
    return Promise.all(this.clientsRef.map(c => this._getUser));
  }
  set clients(userClass) { this.cols.set({ client: userClass.map(u => u.ref) }, { merge: true }); }

  get designers() {
    return Promise.all(this.designersRef.map(d => this._getUser));
  }
  set designers(userClass) { this.cols.set({ designer: userClass.ref }, { merge: true }); }

  get briefs() { return this._getDatabasePromise(ProjectData.Brief); }
  get concepts() { return this._getDatabasePromise(ProjectData.Concept); }
  get drafts() { return this._getDatabasePromise(ProjectData.Draft); }
  get finals() { return this._getDatabasePromise(ProjectData.Final); }
  get revisions() { return this._getDatabasePromise(ProjectData.Revision); }
}

export class Project extends ProjectBase {
  name = '';  // the only nonPromise type

  get client() { console.log("here"); return this._getUser(this.clientRef) };
  set client(userClass) {
    this.designers.then(d => {
      d[0] = userClass;
      this.designers = d;
    });
   };
  get designer() { console.log("here 2"); return this._getUser(this.designerRef) };
  set designer(userClass) {
    this.designers.then(d => {
      d[0] = userClass;
      this.designers = d;
    });
  };
  get brief() { return this.briefs.then(b => b[0]); }
  get concept() { return this.concepts.then(c => c[0]); }
  get draft() { return this.drafts.then(c => c[0]); }
  get final() { return this.finals.then(f => f[0]); }
  get revision() { return this.revisions.then(r => r[0]); }
}

class ProjectDataBase {
  ref = null;
  data = null;
  _init = false;
  get init() {
    return this._init;
  };
  set init(i) {
    this.ref.set({ init: i }, { merge: true });
  }
  constructor(dbQuery, useDefault) {
    if (!useDefault) {
      this.ref = dbQuery.ref;
      this.data = dbQuery.data();
      this._init = this.data['init'];
    }
  }
  _getAll = (obj) => {
    const baseVars = { init: this.init }
    return Object.assign(obj, baseVars);
  };
  _setter(setObj) {
    this.ref.set(setObj, { merge: true }).catch(error => {
      console.error(error);
    });
  }
}

/**
 * # To add testing vars (without changing the database)
 * 1. Set useDefaults to true in Firebase
 * 2. Create empty value:
 * `_location = '';`
 * 3. create getter
 * `get location() { return this._location; };`
 * 4. add your default value to constructor (the defaults are the `else` section)
 * `this._location =  'Western Side of House'`
 * 5. getAll(), _setter(), and data[] will affect the database
 */

/**
 * # To add new fields to the database
 * (Pls go ahead and create whenever you want: I created the clearProjects method so there's always reset button)
 *
 * copy my examples from below, I have left empty examples in the unused Classes
 * ...here's my best explination, you should be able to see where it all came from below
 * 1. Create empty value:
 * `_location = '';`
 * 2. create getter and setter
 * `get location() { return this._location; };`
 * `set location(l) { this._setter({ location: l }).then(() => this._location = l); }`
 * 3. add your default value to constructor
 * `this._location =  'Western Side of House'`
 * 4. add the database call to the constructor
 * `this._location = this.data['location'];`
 * 5. add the field to the getAll
 * `location: this.location`
 * 6. call `this.props.firebase.clearProjects();` anywhere and it will reset the database to include your updates
 * 7. if there's a problem, just remove or comment what was changed and call another clearProjects.
 */

/**
* # Here's how this works
* `this._setter()` will update the database
* * this is why we use the getters and setters
* `this.data['dataName']` will get the variable from the database
* * no need to call to the database more than once
* `getAll()` will be called when creating a new Project
* * Firebase.clearProjects() removes everything then creates the test project (and calls getAll())
* * this means, no data errors becuase it removes all projects that don't include the new vars
*/
export class ProjectData {
  static Brief = {
    colRef: 'briefs',
    type: class Brief extends ProjectDataBase {
      _goals = [];
      get goals() { return this._goals; };
      set goals(g) { this._setter({ goals: g }).then(() => this._goals = g); }
      _location = '';
      get location() { return this._location; };
      set location(l) { this._setter({ location: l }).then(() => this._location = l); }
      _budget = ['', ''];
      get budget() { return this._budget; };
      set budget(b) { this._setter({ budget: b }).then(() => this._budget = b) }
      _narrative = '';
      get narrative() { return this._narrative; };
      set narrative(n) { this._setter({ narrative: n }).then(() => this._narrative = n); }
<<<<<<< HEAD

=======
      _completed = '';
      get completed() { return this._completed; };
      set completed(c) { this._setter({ completed: c }).then(() => this._completed = c); }
      _profile = {};
      get profile() { return this._profile; };
      set profile(p) { this._setter({ profile: p }).then(() => this._profile = p); }
>>>>>>> development
      constructor(dbQuery, useDefault = false) {
        super(dbQuery, useDefault);
        if (!useDefault) {
          this._goals = this.data['goals'];
          this._location = this.data['location'];
          this._budget = this.data['budget'];
          this._narrative = this.data['narrative'];
<<<<<<< HEAD
=======
          this._completed = this.data['completed'];
          this._profile = this.data['profile'];
>>>>>>> development
        } else {
          this._goals = ['goal 11', 'goal 2', 'goal 2'];
          this._location = 'Western Side of House';
          this._budget = ['$500', '$1000'];
          this._narrative = 'It\'s gonna look pretty:)';
<<<<<<< HEAD
=======
          this._completed = false;
          this._profile = { spacing: "full", variety: "mixed", edges: "curved", ground: "mulch", form: "climbing" };
>>>>>>> development
        }
      }

      getAll() {
        return this._getAll({
          goals: this.goals,
          location: this.location,
          budget: this.budget,
<<<<<<< HEAD
          narrative: this.narrative
=======
          narrative: this.narrative,
          completed: this.completed,
          profile: this.profile
>>>>>>> development
        });
      }
    }
  };

  static Concept = {
    colRef: 'concepts',
    type: class Concept extends ProjectDataBase {
      /**
     * ```javascript
     * _yourVar = yourVarEmptyDefault;
     * get yourVar() { return this._yourVar; }
     * set yourVar(v) { this._setter({ yourVar: v }).then(() => this._yourVar = v); } }
     */
      constructor(dbQuery, useDefault = false) {
        super(dbQuery, useDefault);
        if (!useDefault) {
          /**
           * ```javascript
           * this._yourVar = this.data['yourVar'];
           * */
        } else {
          /**
           * ```javascript
           * this._yourVar = defaultValueOfYourVar;
           * */
        }
      }
      getAll() {
        return this._getAll({
          // yourVar: this.yourVar
        });
      }
    }
  };
  static Draft = {
    colRef: 'drafts',
    type: class Draft extends ProjectDataBase {
      _media = '';
      get media() { return this._media; };
      set media(m) { this._setter({ media: m }).then(() => this._media = m); }
      _video = '';
      get video() { return this._video; };
      set video(v) { this._setter({ video: v }).then(() => this._video = v); }
      _feedback = '';
      get feedback() { return this._feedback; };
      set feedback(f) { this._setter({ feedback: f }).then(() => this._feedback = f); }
      _completed = '';
      get completed() { return this._completed; };
      set completed(c) { this._setter({ completed: c }).then(() => this._completed = c); }
      constructor(dbQuery, useDefault = false) {
        super(dbQuery, useDefault);
        if (!useDefault) {
          this._media = this.data['media'];
          this._video = this.data['video'];
          this._feedback = this.data['feedback'];
          this._completed = this.data['completed'];
        } else {
          this._media = 'https://drive.google.com/drive/folders/1H-aSlCfzkodqk8W7JWWv_z8L1GifTZR2?usp=sharing';
          this._video = '7i1w4N29C9I';
          this._feedback = 'https://demo.typeform.com/to/njdbt5';
          this._completed = false;
        }
      }
      getAll() {
        return this._getAll({
          media: this.media,
          video: this.video,
          feedback: this.feedback,
          completed: this.completed
        });
      }
    }
  };
  static Final = {
    colRef: 'finals',
    type: class Final extends ProjectDataBase {
       /**
     * ```javascript
     * _yourVar = yourVarEmptyDefault;
     * get yourVar() { return this._yourVar; }
     * set yourVar(v) { this._setter({ yourVar: v }).then(() => this._yourVar = v); } }
     */
      constructor(dbQuery, useDefault = false) {
        super(dbQuery, useDefault);
        if (!useDefault) {
          /**
           * ```javascript
           * this._yourVar = this.data['yourVar'];
           * */
        } else {
          /**
           * ```javascript
           * this._yourVar = defaultValueOfYourVar;
           * */
        }
      }
      getAll() {
        return this._getAll({
          // yourVar: this.yourVar
        });
      }
    }
  };
  static Revision = {
    colRef: 'revisions',
    type: class Revision extends ProjectDataBase {
      _isPaid = false;
      get isPaid() {return this._isPaid; }
      set isPaid(p) {this._setter({ isPaid: p }).then(() => this._isPaid = p); } 
      constructor(dbQuery, useDefault = false) {

        super(dbQuery, useDefault);
        if (!useDefault) {
 
          this._isPaid = this.data["isPaid"];

        } else {

          this._isPaid = [false];
        }
      }
      getAll() {
        return this._getAll({
          isPaid: this.isPaid
        });
      }
    }
  }
}
