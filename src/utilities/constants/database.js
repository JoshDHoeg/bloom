export class User {
  constructor(dbQuery) {
      const data = dbQuery.data();
      this.client = data['client']; // boolean
      this.email = data['email']; // string
      this.name = data['name']; // string
      this.phone = data['phone']; // string
      this.projects = data['projects']; // DocumentReference[]
      this.id = dbQuery.ref.id; // string
  }
}

export class Project {
  constructor(documentRef) {
    this.cols = documentRef.ref;
    const data = documentRef.data();
    this.name = data['name']; // String (the only nonPromise type)
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
  get designer() { return this.designerRef.get().then(userSnap => new User(userSnap)); }

  get briefs() { return this.getDatabasePromise(ProjectData.Brief); }
  get concepts() { return this.getDatabasePromise(ProjectData.Concept); }
  get finals() { return this.getDatabasePromise(ProjectData.Final); }
  get revisions() { return this.getDatabasePromise(ProjectData.Revision); }
  getDatabasePromise = projectData =>
    this.cols.collection(projectData.colRef).get().then(colSnap => {
      return colSnap.docs.map(doc => new projectData.type(doc));
    });
}

export class ProjectData {
  static Brief = {
    colRef: 'brief',
    type: class Brief {
      constructor(dbQuery) {
        const data = dbQuery.data();
        this.info = data['info'];
      }
    }
  };
  static Concept = {
    colRef: 'concept',
    type: class Concept {
      constructor(dbQuery) {
        const data = dbQuery.data();
        this.info = data['info'];
      }
    }
  };
  static Final = {
    colRef: 'final',
    type: class Final {
      constructor(dbQuery) {
        const data = dbQuery.data();
        this.info = data['info'];
      }
    }
  };
  static Revision = {
    colRef: 'revisions',
    type: class Revision {
      constructor(dbQuery) {
        const data = dbQuery.data();
        this.info = data['info'];
      }
    }
  }
}