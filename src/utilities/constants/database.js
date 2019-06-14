import Firebase from '../Firebase';
import { throws } from 'assert';


export class User {
  _isDesigner = false;
  get isDesigner() { return this._isDesigner; }
  set isDesigner(designer) {
    this.ref.set({ isDesigner: designer });
  }
  _email = '';
  get email() { return this._email; }
  set email(email) {
    this.ref.set({ email: email }, {merge: true});
  }
  _name = '';
  get name() { return this._name; }
  set name(name) {
    this.ref.set({ name: name }, {merge: true});
  }
  _phone = '';
  get phone() { return this._phone; }
  set phone(phone) {
    this.ref.set({ phone: phone }, {merge: true});
  }
  _projects = [];
  get projects() { return this._projects; }
  set projects(projs) {
    this.ref.set({ projects: projs });
  }
  _billadd1 = ''
  get billadd1() { return this._billadd1; }
  set billadd1(add1) {
    this.ref.set({ billadd1: add1 }, {merge:true})
  }
  _zip = ''
  get zip() { return this._zip; }
  set zip(zip) {
    this.ref.set({ zip: zip }, {merge:true})
  }
  _city = ''
  get city() { return this._city }
  set city(city) {
    this.ref.set({ city: city }, {merge:true})
  }
  _state = ''
  get state() { return this._state }
  set state(state) {
    this.ref.set({ state: state }, {merge:true})
  }
  _role = ''
  get role() { return this._role }
  set role(role) {
    this.ref.set({ role: role }, {merge: true})
  }
  _isAdmin = ''
  get isAdmin() { return this._isAdmin }
  set isAdmin(isAdmin) {
    this.ref.set({ isAdmin: isAdmin }, {merge: true})
  }

  get uid() { return this.id };

  _helpChannel = null;
  get helpChannel(){return this._helpChannel; }
  set helpChannel(chanRef){
    this.ref.set({ helpChannel: chanRef});
    this._helpChannel = chanRef;
  }


  constructor(dbQuery) {
    const data = dbQuery.data();
    this._isDesigner = data['isDesigner'];
    this._email = data['email'];
    this._name = data['name'];
    this._phone = data['phone'];
    this._billadd1 = data['billadd1'];
    this._zip = data['zip'];
    this._city = data['city'];
    this._state = data['state'];
    this._projects = data['projects']; // DocumentReference[]
    this._helpChannel = data['helpChannel'];
    this.ref = dbQuery.ref;
    this.id = this.ref.id; // string
    this._billadd1 = data['billadd1'];
    this._zip = data['zip'];
    this._city = data['city'];
    this._state = data['state'];
    this._role = data['role'];
    this._isAdmin = data['isAdmin']
  }

  _getAll = (obj) => {
    const baseVars = { init: this.init }
    return Object.assign(obj, baseVars);
  };


  getAll() {
    return this._getAll({
      email: this.email,
      name: this.name,
      phone: this.phone,
      billadd1: this.billadd1,
      zip: this.zip,
      city: this.city,
      state: this.state,
      projects: this.projects,
      role: this.role,
      isAdmin: this.isAdmin
    });
  }
}

export class Channel {
  _p1 = null;
  get p1() { return this._p1; }
  set p1(p1Ref){
    this.ref.set({p1: p1Ref}, {merge: true});
    this._p1 = p1Ref;
  }
  _p2 = null;
  get p2() { return this._p2; }
  set p2(p2Ref){
    this.ref.set({p2: p2Ref}, {merge: true});
    this._p2 = p2Ref;
  }
  _name = "";
  get name(){return this._name;}
  set name(n){
    this.ref.set({name: n}, {merge: true});
    this._name = n;
  }

  _messages = [];
  get messages(){return this._messages;}
  set messages(mArr){
      this.ref.set({messages: mArr});
      this._messages = mArr;
  }

  constructor(channelRef){
    const data = channelRef.data();
    this._p1 = data['p1'];
    this._p2 = data['p2'];
    this._name = data['name'];
    this._messages = data['messages'];
    this.ref = channelRef.ref;
    this.id = this.ref.id;
  }

}


export class Message {
    _from = null;
    get from() { return this._from; }
    set from(name){
        this.ref.set({from: name}, {merge: true});
        this._from = name;
    }
    _time = "";
    get time(){return this._time;}
    set time(t){
        this.ref.set({time: t}, {merge: true});
        this._time = t;
    }
    _content = "";
    get content(){return this._content;}
    set content(c){
        this.ref.set({content: c}, {merge: true});
        this._content = c;
    }
    constructor(m){
        const data = m.data();
        this._from = data['from'];
        this._time = data['time'];
        this._content = data['content'];
        this.ref = m.ref;
        this.id = this.ref.id;
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
    this.channel = data['channel'];
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
  get stages() { return this._getDatabasePromise(ProjectData.Stage); }
}

export class Project extends ProjectBase {
  name = '';  // the only nonPromise type

  get client() { return this._getUser(this.clientRef) };
  set client(userClass) {
    this.designers.then(d => {
      d[0] = userClass;
      this.designers = d;
    });
   };
  get designer() { return this._getUser(this.designerRef) };
  set designer(userClass) {
    this.designers.then(d => {
      d[0] = userClass;
      this.designers = d;
    });
  };
  _status = '';
  get status() { return this._status; }
  set status(s) {
    this.ref.set({ status: s }, { merge: true });
  }

  get brief() { return this.briefs.then(b => b[0]); }
  get concept() { return this.concepts.then(c => c[0]); }
  get draft() { return this.drafts.then(c => c[0]); }
  get final() { return this.finals.then(f => f[0]); }
  get revision() { return this.revisions }
  get stage() {return this.stages.then(s => s[0]); }
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
      return this.ref.set(setObj, { merge: true }).catch(error => {
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
      get budget() {
        return this._budget;
      };
      set budget(b) {
          this._setter({ budget: b }).then(() => this._budget = b)
      }
      doSetBudget(b){
          this._setter({ budget: b }).then(() => this._budget = b);
      }
      _narrative = '';
      get narrative() { return this._narrative; };
      set narrative(n) { this._setter({ narrative: n }).then(() => this._narrative = n); }
      _completed = '';
      get completed() { return this._completed; };
      set completed(c) { this._setter({ completed: c }).then(() => this._completed = c); }
      _profile = {};
      get profile() {
        return this._profile; };
      set profile(p) {
        this._setter({ profile: p }).then(() => this._profile = p);
      }
      doSetProfile(p){
          this._setter({ profile: p }).then(() => this._profile = p);
      }

      constructor(dbQuery, useDefault = false) {
        super(dbQuery, useDefault);
        if (!useDefault) {
          this._goals = this.data['goals'];
          this._location = this.data['location'];
          this._budget = this.data['budget'];
          this._narrative = this.data['narrative'];
          this._completed = this.data['completed'];
          this._profile = this.data['profile'];
        } else {
          this._goals = ['goal 11', 'goal 2', 'goal 2'];
          this._location = 'Western Side of House';
          this._budget = ['$500', '$1000'];
          this._narrative = 'It\'s gonna look pretty:)';
          this._completed = false;
          this._profile = { spacing: "full", variety: "mixed", edges: "curved", ground: "mulch", form: "climbing" };
        }
      }

      getAll() {
        return this._getAll({
          goals: this.goals,
          location: this.location,
          budget: this.budget,
          narrative: this.narrative,
          completed: this.completed,
          profile: this.profile
        });
      }
    }
  };
  static Concept = {
    colRef: 'concepts',
    type: class Concept extends ProjectDataBase {
      _media = '';
      get media() { return this._media; };
      set media(m) { this._setter({ media: m }).then(() => this._media = m); }
      _video = '';
      get video() { return this._video; };
      set video(v) { this._setter({ video: v }).then(() => this._video = v); }
      _completed = '';
      get completed() { return this._completed; };
      set completed(c) { this._setter({ completed: c }).then(() => this._completed = c); }
      _isApproved = false;
      get approved() {return this._isApproved; };
      set approved(a) {this._setter({ approved: a }).then(() => this._isApproved = a); }
      _step = '';
      get step() {return this._step; };
      set step(a) {this._setter({ step: a }).then(() => this._step = a); }
      _isPaid = false;
      get isPaid() {return this._isPaid; };
      set isPaid(p) {this._setter({ isPaid: p }).then(() => this._isPaid = p); }
      _cost = '';
      get cost() { return this._cost; };
      set cost(c) {this._setter({ cost: c }).then(() => this._cost = c); }
      _ApproveTerms = false;
      get approveterms() {return this._ApproveTerms; };
      set approveterms(t) {this._setter({ approveterms: t }).then(() => this._ApproveTerms = t); }

      constructor(dbQuery, useDefault = false) {
        super(dbQuery, useDefault);
        if (!useDefault) {
          this._media = this.data['media'];
          this._video = this.data['video'];
          this._completed = this.data['completed'];
          this._isApproved = this.data['approved'];
          this._isPaid = this.data['isPaid']
          this._cost = this.data['cost']
          this._ApproveTerms = this.data['approveterms']
        } else {
          this._media = 'https://drive.google.com/drive/folders/1H-aSlCfzkodqk8W7JWWv_z8L1GifTZR2?usp=sharing';
          this._video = '7i1w4N29C9I';
          this._completed = false;
          this._isApproved = false;
          this._isPaid = false;
          this._cost = 59999;
          this._ApproveTerms = false
        }
      }
      getAll() {
        return this._getAll({
          media: this.media,
          video: this.video,
          completed: this.completed,
          approved: this.approved,
          isPaid: this.isPaid,
          cost: this.cost,
          approveterms: this.approveterms,
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
      _figma = '';
      get figma() { return this._figma; };
      set figma(g) { this._setter({ figma: g }).then(() => this._figma = g); }
      _video = '';
      get video() { return this._video; };
      set video(v) { this._setter({ video: v }).then(() => this._video = v); }
      _feedback = '';
      get feedback() { return this._feedback; };
      set feedback(f) { this._setter({ feedback: f }).then(() => this._feedback = f); }
      _completed = '';
      get completed() { return this._completed; };
      set completed(c) { this._setter({ completed: c }).then(() => this._completed = c); }
      _isApproved = false;
      get approved() {return this._isApproved; };
      set approved(a) {this._setter({ approved: a }).then(() => this._isApproved = a); }
      _feedback = '';
      get feedback() { return this._feedback; };
      set feedback(f) { this._setter({ feedback: f }).then(() => this._feedback = f); }

      constructor(dbQuery, useDefault = false) {
        super(dbQuery, useDefault);
        if (!useDefault) {
          this._media = this.data['media'];
          this._figma = this.data['figma'];
          this._video = this.data['video'];
          this._feedback = this.data['feedback'];
          this._completed = this.data['completed'];
          this._isApproved = this.data['approved'];
          this._feedback = this.data['feedback'];
        } else {
          this._media = 'https://drive.google.com/drive/folders/1H-aSlCfzkodqk8W7JWWv_z8L1GifTZR2?usp=sharing';
          this._figma = 'https://www.figma.com/file/ggEHJtusFHITsrjRhvjtJZY5/Bloomtime-Platform-v2?node-id=0%3A1';
          this._video = '7i1w4N29C9I';
          this._feedback = '';
          this._completed = false;
          this._isApproved = false;
        }
      }
      getAll() {
        return this._getAll({
          media: this.media,
          figma: this.figma,
          video: this.video,
          feedback: this.feedback,
          completed: this.completed,
          approved: this.approved,
        });
      }
    }
  };
  static Final = {
    colRef: 'finals',
    type: class Final extends ProjectDataBase {
      _media = '';
      get media() { return this._media; };
      set media(m) { this._setter({ media: m }).then(() => this._media = m); }
      _figma = '';
      get figma() { return this._figma; };
      set figma(g) { this._setter({ figma: g }).then(() => this._figma = g); }
      _video = '';
      get video() { return this._video; };
      set video(v) { this._setter({ video: v }).then(() => this._video = v); }
      _completed = '';
      get completed() { return this._completed; };
      set completed(c) { this._setter({ completed: c }).then(() => this._completed = c); }
      _isApproved = false;
      get approved() {return this._isApproved; };
      set approved(a) {this._setter({ approved: a }).then(() => this._isApproved = a); }
      _feedback = '';
      get feedback() { return this._feedback; };
      set feedback(f) { this._setter({ feedback: f }).then(() => this._feedback = f); }

      constructor(dbQuery, useDefault = false) {
        super(dbQuery, useDefault);
        if (!useDefault) {
          this._media = this.data['media'];
          this._figma = this.data['figma'];
          this._video = this.data['video'];
          this._completed = this.data['completed'];
          this._isApproved = this.data['approved'];
          this._feedback = this.data['feedback'];
        } else {
          this._media = 'https://drive.google.com/drive/folders/1H-aSlCfzkodqk8W7JWWv_z8L1GifTZR2?usp=sharing';
          this._figma = 'https://www.figma.com/file/ggEHJtusFHITsrjRhvjtJZY5/Bloomtime-Platform-v2?node-id=0%3A1';
          this._video = '7i1w4N29C9I';
          this._completed = false;
          this._isApproved = false;
          this._feedback = '';
        }
      }
      getAll() {
        return this._getAll({
          media: this.media,
          figma: this.figma,
          video: this.video,
          completed: this.completed,
          approved: this.approved,
          feedback: this.feedback,
        });
      }
    }
  };

  static Revision = {
    colRef: 'revisions',
    type: class Revision extends ProjectDataBase {
      _media = '';
      get media() { return this._media; };
      set media(m) { this._setter({ media: m }).then(() => this._media = m); }
      _completed = '';
      get completed() { return this._completed; };
      set completed(c) { this._setter({ completed: c }).then(() => this._completed = c); }
      _feedback = '';
      get feedback() { return this._feedback; };
      set feedback(f) { this._setter({ feedback: f }).then(() => this._feedback = f); }
      _isApproved = false;
      get approved() {return this._isApproved; };
      set approved(a) {this._setter({ approved: a }).then(() => this._isApproved = a); }
      _figma = '';
      get figma() { return this._figma; };
      set figma(g) { this._setter({ figma: g }).then(() => this._figma = g); }


      constructor(dbQuery, useDefault = false) {
        super(dbQuery, useDefault);
        if (!useDefault) {
          this._media = this.data['media'];
          this._completed = this.data['completed'];
          this._feedback = this.data['feedback'];
          this._isApproved = this.data['approved'];
          this._figma = this.data['figma'];
        } else {
          this._media = 'https://drive.google.com/drive/folders/1H-aSlCfzkodqk8W7JWWv_z8L1GifTZR2?usp=sharing';
          this._completed = false;
          this._feedback = '';
          this._isApproved = false
          this._figma = 'https://www.figma.com/file/ggEHJtusFHITsrjRhvjtJZY5/Bloomtime-Platform-v2?node-id=0%3A1';
        }
      }
      getAll() {
        return this._getAll({
          media: this.media,
          completed: this.completed,
          feedback: this.feedback,
          approved: this.approved,
          figma: this.figma,
        });
      }
    }
  };
  static Stage = {
    colRef: 'stage',
    type: class Stage extends ProjectDataBase {
      _stage = '';
      get stage() { return this._stage; };
      set stage(s) { this._setter({ stage: s }).then(() => this._stage = s); }
      _rcount = 0;
      get rcount() { return this._rcount; };
      set rcount(c) { this._setter({ rcount: c }).then(() => this._rcount = c); };

      constructor(dbQuery, useDefault = false) {
        super(dbQuery, useDefault);
        if (!useDefault) {
          this._stage = this.data['stage'];
          this._rcount = this.data['rcount'];
        } else {
          this._stage = 'concept';
          this._rcount = '0';
        }
      }
      getAll() {
        return this._getAll({
          stage: this.stage,
          rcount: this.rcount
        })
      }
    }
  }
}
