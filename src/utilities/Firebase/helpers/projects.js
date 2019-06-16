import FirebaseAuthUser from './authUser';
import { ProjectData, Project } from '../../constants/database';
import Firebase from '../firebase';


class FirebaseProjects extends FirebaseAuthUser  {
  constructor() {
    super();
    console.log('projects');
  }


  //creates empty project with default designer
// o0Ds4w9vFmV1l8Z3BehEVYH4wHl2 is our default designer!!
  doCreateEmptyProject = () => {
      return this.doGetUser("userAuthID").then( designer => {
          console.log(designer);
          var proj = this.projectsRef.doc();
          proj.set({
              client: [null],
              designer: [designer.ref],
              _name: "tester",
              _status: "brief"
          })
          const b = proj.collection('briefs');
          const c = proj.collection('concepts');
          const d = proj.collection('drafts');
          const f = proj.collection('finals');
          const r = proj.collection('revisions');
          const s = proj.collection('stage')
          const l = proj.collection('contractors')
          b.doc('0').set({
            address: "",
            budget: "",
            completed: false,
            goals: ["demo goal", "Demo Goal 2"],
            init: false,
            media: "",
            narrative: "",
            profile: {
              spacing: '',
              variety: '',
              edging: '',
              ground: '',
              form: ''
            }
          });
          c.doc('0').set({
            init: false,
            feedback: "",
            video: "",
            media:"",
            completed: false,
            approved: false,
            isPaid: false,
            cost: 59999,
            approveterms: false
          });
          d.doc('0').set({
            init: false,
            feedback: "",
            video: "",
            media:"",
            figma: "https://www.figma.com/file/ggEHJtusFHITsrjRhvjtJZY5/Bloomtime-Platform-v2?node-id=0%3A1",
            completed: false,
            approved: false,
          });
          f.doc('0').set({
            init: false,
            feedback: "",
            video: "",
            media:"",
            figma: "https://www.figma.com/file/ggEHJtusFHITsrjRhvjtJZY5/Bloomtime-Platform-v2?node-id=0%3A1",
            completed: false,
            approved: false,
          });
          s.doc('0').set({
            init: false,
            stage: "concept",
            rcount: '0',
          });
          l.doc('0').set({
            init: false,
            contractor1: 'Landscaper 1',
            price1: 0,
            stars1: 5,
            number1: '000-000-0000',
            contractor2:'Landscaper 2',
            price2: 0,
            stars2: 5,
            number2: '000-000-0000',
            contractor3: 'Landscaper 3',
            price3: 0,
            stars3: 5,
            number3: '000-000-0000'
          })
          return proj.get().then(data => {
              return new Project(data);
          })

      })
  }

  doCreateRevision = (id, customerFeedback, revisionCount, index, isUID = false) => {
    if (isUID) {
      return this.doGetUser(id).then(userData => this.doCreateRevision(userData.projects[index].id, customerFeedback, revisionCount));
    } else {
      return this.projectsRef.doc(id).collection('revisions').doc(revisionCount).set({
        init: false,
        feedback: customerFeedback,
        media:"",
        figma: "https://www.figma.com/file/ggEHJtusFHITsrjRhvjtJZY5/Bloomtime-Platform-v2?node-id=0%3A1",
        completed: false,
        approved: false,
      });
    }
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

  doGetProject = (id, index, isUID = false) => { // return Promise<Project>
    if (isUID) {
      return this.doGetUser(id).then(userData => this.doGetProject(userData.projects[index].id));
    } else {
      return this.projectsRef.doc(id).get().then(data => {
        console.log(data);
        return new Project(data)
      });
  }
}

  //get array of project objects objects associated with a user
  doGetProjects = (uid) => {
      return this.doGetUser(uid).then(userData => {
          var proms = userData.projects.map(projectRef => {
              return this.doGetProject(projectRef.id).then(p => {
                  return p;
              })
          })
          return Promise.all(proms).then(res => {
              return res;
          });
      });
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
      [ProjectData.Brief, ProjectData.Concept, ProjectData.Final, ProjectData.Revision, ProjectData.Stage, ProjectData.Contractor].map(obj => {
        return docRef.collection(obj.colRef).doc('0').set(new obj.type(null, true).getAll(), { merge: true });
      })
    );
    return docRef;
  }

  //clientUid = 'userAuthID', designerUid = 'l9d1ECyWoJb4tpqCAz2SnXIyHH52',
  doUpdateProject = async (name = 'Test Project', clientUid = 'Admin', designerUid = 'o0Ds4w9vFmV1l8Z3BehEVYH4wHl2', pid = null, returnProject = true) => {
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
            [ProjectData.Brief, ProjectData.Concept, ProjectData.Final, ProjectData.Revision, ProjectData.Stage, ProjectData.Contractor].forEach(col => {
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
