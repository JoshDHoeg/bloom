import FirebaseAuthUser from './authUser';
import { ProjectData, Project } from '../../constants/database';
import Firebase from '../firebase';

class FirebaseProjects extends FirebaseAuthUser  {
  constructor() {
    super();
    console.log('projects');
  }

  //creates empty project with default designer
  doCreateEmptyProject = () => {
      return this.doGetUser("userAuthID").then( designer => {
          var proj = this.projectsRef.doc();
          proj.set({
              client: [null],
              designer: [designer.ref],
              name: "tester"
          })
          const b = proj.collection('briefs');
          const c = proj.collection('concepts');
          const f = proj.collection('finals');
          const r = proj.collection('revisions');
          b.doc('0').set({
              address: "",
              budget: "",
              completed: false,
              goals: [null],
              init: false,
              media: "",
              narrative: ""
          });
          c.doc('0').set({
              init: false,
              typeformURL: "",
              videoID: ""
          });
          f.doc('0').set({
              figmaURL: "",
              init: false,
              typeformURL: "",
              videoID: ""
          });
          r.doc('0').set({
              figmaURL: "",
              init: false,
              typeformURL: ""
          });
          return proj;
      })
  }

  //could maybe have doCreateUser... return a user object so we don't have to call doGetUser again
  doInitNewUser = (email , password) => {
      return this.doCreateEmptyProject().then( proj => {
          console.log(proj);
          return this.doCreateUserWithEmailAndPassword(email, password, proj.id)
              .then(ref => {
                      proj.set({
                          client: [ref]
                      }, {merge : true});
                      return ref.id;
              });
      });
  }

  get projects() {
    return this.projectsRef.get().then(projs => projs.docs.map(proj => new Project(proj)));
  }

  doGetProject = (id, isUID = false) => { // return Promise<Project>
    console.log("inside doGetProject");
    if (isUID) {
        //this.doGetUser(id).then(userData => console.log(userData));
        return this.doGetUser(id).then(userData => this.doGetProject(userData.projects[0].id));
    } else{
      return this.projectsRef.doc(id).get().then(data => {
          return new Project(data);
      });
    }
  }

  _doGetProjectTemplate = async (name, clientUid, designerUid) => {
    let cuids = Array.isArray(clientUid) ? clientUid : [clientUid];
    let duids = Array.isArray(designerUid) ? designerUid : [designerUid];
    const clientRefs = await Promise.all(cuids.map(cuid => {
      return this.usersRef.doc(cuid).get().then(data => data.ref);
    }));
    const designerRefs = await Promise.all(duids.map(duid => {
      return this.usersRef.doc(duid).get().then(data => data.ref);
    }));
    if (Firebase.preventBreakingChanges) {
      return { name: name, client: clientRefs[0], designer: designerRefs[0] }
    } else {
        return { name: name, client: clientRefs, designer: designerRefs }
    }

  }

  _doUpdateProjectData = async (docRef, returnProject) => {
    await Promise.all(
      [ProjectData.Brief, ProjectData.Concept, ProjectData.Draft, ProjectData.Final, ProjectData.Revision].map(obj => {
        return docRef.collection(obj.colRef).doc('0').set(new obj.type(null, true).getAll(), { merge: true });
      })
    );
    return docRef;
  }

  doUpdateProject = async (name = 'Test Project', clientUid = 'userAuthID', designerUid = 'l9d1ECyWoJb4tpqCAz2SnXIyHH52', pid = null, returnProject = true) => {
    const newName = name === 'Test Project' ? `Test Project ${await this.cheekyProjectNaming()}` : name;
    const projectRef = await this._doGetProjectTemplate(newName, clientUid, designerUid)
      .then(project => {
        if (pid) {
          const docRef = this.projectsRef.doc(pid)
          return this.projectsRef.doc(pid).set(project).then(() => docRef)
        }
        return this.projectsRef.add(project)
      }).then(this._doUpdateProjectData).catch(error => {
        console.error('Error creating project: ', error);
        return false;
      });
    if (projectRef && returnProject)
      return this.doGetProject(projectRef.id);
    else return projectRef;

  }

  cheekyProjectNaming = async () => {
    const projects = await this.projects.then();
    if (projects && projects.length > 0)
      return 1 + Math.max.apply(null, projects.map(p => parseInt(+p.name.split(/ /).pop()) || 0));
    return 0;
  }

  _deleteAll(collection, deleteSubCollections = false, isProject = false) {
    const listener = collection.onSnapshot(docs => {
      docs.forEach(d => {
        if (deleteSubCollections) {
          if (isProject)
            [ProjectData.Brief, ProjectData.Concept, ProjectData.Draft, ProjectData.Final, ProjectData.Revision].forEach(col => {
              this._deleteAll(d.ref.collection(col.colRef), true);
            });
          d.ref.delete();
        }
      });
    });
    setTimeout(() => {
      listener();
    }, 1000);
  }
}
export default FirebaseProjects;
