export class User {
  _client = false;
  get client() { return this._client; }
  set client(isClient) {
    this.ref.set({ client: isClient });
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
  constructor(dbQuery) {
    const data = dbQuery.data();
    this._client = data['client'];
    this._email = data['email'];
    this._name = data['name'];
    this._phone = data['phone'];
    this._projects = data['projects']; // DocumentReference[]
    this.ref = dbQuery.ref;
    this.id = this.ref.id; // string
  }
}

export class Project {
  name = '';  // the only nonPromise type
  constructor(documentRef) {
    this.cols = documentRef.ref;
    const data = documentRef.data();
    this.name = data['name'];
    this.clientRef = data['client'];
    this.designerRef = data['designer'];
  }
  getProjectData = async () => { // For testing and ease of use
    // (this is a single promise, but it is more time consuming & unnecessary when we code split final prod)
    const data = await Promise.all([this.client, this.designer, this.briefs, this.concepts, this.finals, this.revisions]);
    return data.reduce((d, item, i) => {
      d[Array.isArray(item) ? item[0].constructor.name : item.constructor.name] = item;
      return d;
    }, { name: this.name });
  }
  get client() { return this.clientRef.get().then(userSnap => new User(userSnap)); }
  set client(userClass) { this.cols.set({ client: userClass.ref }, { merge: true }); }
  get designer() { return this.designerRef.get().then(userSnap => new User(userSnap)); }
  set designer(userClass) { this.cols.set({ designer: userClass.ref }, { merge: true }); }

  get briefs() { return this.getDatabasePromise(ProjectData.Brief); }
  // set brief(briefClass) {
  //   this.setDatabasePromise(ProjectData.Brief, briefClass)
  // }
  get concepts() { return this.getDatabasePromise(ProjectData.Concept); }
  get finals() { return this.getDatabasePromise(ProjectData.Final); }
  get revisions() { return this.getDatabasePromise(ProjectData.Revision); }
  getDatabasePromise = projectData =>
    this.cols.collection(projectData.colRef).get().then(colSnap => {
      return colSnap.docs.map(doc => new projectData.type(doc));
    });
  // TODO: for setting by class (could be useful in the future)
  // setDatabasePromise = (projectData, newData) =>
  //   this.cols.collection(projectData.colRef).set(
  //     newData._getAll(), { merge: true });
}

class ProjectDataBase {
  _init = false;
  get init() {
    return this._init;
  };
  set init(i) {
    this.ref.set({ init: i }, { merge: true });
  }
  constructor(dbQuery) {
    this.ref = dbQuery.ref;
    this.data = dbQuery.data();
    this._init = this.data['init'];
  }
  _getAll = () => { return { init: this.init } };
}

export class ProjectData {
  static Brief = {
    colRef: 'briefs',
    type: class Brief extends ProjectDataBase {
      _goals = ['fake1', 'fake2', 'fake3'];
      get goals() {
        return this._goals;
      };
      set goals(g) {
        this._goals = g;
      }
      _location = 'Western Side of House';
      get location() {
        return this._location;
      };
      set location(l) {
        this._location = l;
      }
      _budget = ['$500', '$1000'];
      get budget() {
        return this._budget;
      };
      set budget(b) {
        this._budget = b;
      }
      _narrative = 'It\'s gonna look pretty:)';
      get narrative() {
        return this._narrative;
      };
      set narrative(n) {
        this._narrative = n;
      }
    }
  };
  static Concept = {
    colRef: 'concepts',
    type: class Concept extends ProjectDataBase { }
  };
  static Final = {
    colRef: 'finals',
    type: class Final extends ProjectDataBase { }
  };
  static Revision = {
    colRef: 'revisions',
    type: class Revision extends ProjectDataBase { }
  }
}
