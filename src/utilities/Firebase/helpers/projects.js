import FirebaseAuthUser from './authUser'; // user authentication info
import { ProjectData, Project } from '../../constants/database'; //project information
import Firebase from '../firebase';


class FirebaseProjects extends FirebaseAuthUser  {
  constructor() {
    super();
  }


  //creates empty project with default designer
// o0Ds4w9vFmV1l8Z3BehEVYH4wHl2 is our default designer!!
  doCreateEmptyProject = () => {
        const DESIGNER = process.env.NODE_ENV === 'production' //Setting the stripe font-end api keys
      ? 'o0Ds4w9vFmV1l8Z3BehEVYH4wHl2'
      : 'oV5VqI6E5zU7XPbC2Y129E9Otbz2';
      
      return this.doGetUser(DESIGNER).then( designer => {
          var proj = this.projectsRef.doc();
          proj.set({
              client: [null], //no client defined currently
              designer: [designer.ref], //defines which designer is on this project
              _name: "tester", //defines name and status
              _status: "brief"
          })
          const b = proj.collection('briefs'); //defines variables for various stages needed
          const c = proj.collection('concepts');
          const d = proj.collection('drafts');
          const f = proj.collection('finals');
          const s = proj.collection('stage');
          const l = proj.collection('contractors');
          b.doc('0').set({ //briefs section
            address: "3100 Flower Lane", //address of the client's house
            budget: 599, //budget to build design in
            completed: false, //project is not yet completed
            goals: ["demo goal", "Demo Goal 2"], //goals to work towards
            init: false,
            media: "", //no current media
            narrative: "",
            profile: {
              spacing: '', //information for profile, nothing determined yet
              variety: '',
              edging: '',
              ground: '',
              form: ''
            }
          });
          c.doc('0').set({ //concepts section
            init: false,
            active: false,
            feedback: "", //empty feedback
            video: "", //no video or media yet
            media:"",
            completed: false, //nothing has been filled out yet, so not approved, not completed, not paid
            approved: false,
            isPaid: false,
            cost: 59999,
            deposit: 0,
            discount: 0,
            approveterms: false, //terms not yet approved
            terms: ""
          });
          d.doc('0').set({ //drafts section
            init: false,
            feedback: "",
            video: "",
            media:"",
            figma: "https://www.figma.com/file/ggEHJtusFHITsrjRhvjtJZY5/Bloomtime-Platform-v2?node-id=0%3A1", //figma file for draft
            completed: false, //not completed or approved yet
            approved: false,
          });
          f.doc('0').set({ //finals section
            init: false,
            feedback: "",
            video: "",
            media:"",
            figma: "https://www.figma.com/file/ggEHJtusFHITsrjRhvjtJZY5/Bloomtime-Platform-v2?node-id=0%3A1", //figma file for final draft
            completed: false, //still not completed or approved
            approved: false,
          });
          s.doc('0').set({ //stage section
            init: false,
            stage: "concept", //sets stage to concept status
            rcount: '0', //no revision counts of yet
          });
          l.doc('0').set({ //contractors section
            init: false,
            contractor1: 'Landscaper 1', //landscaper name
            price1: 0, //price for this landscaper
            stars1: 5, //landscaper rating, later will be determined by user reviews(?)
            number1: '000-000-0000', //landscaper phonenumber
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
              return new Project(data); //returns the new project information
          })

      })
  }

  doCreateRevision = (id, revisionCount, index, isUID = false) => { //creates a new revision
    if (isUID) { //if user id is valid?
      return this.doGetUser(id).then(userData => this.doCreateRevision(userData.projects[index].id, revisionCount)); //retrieves user information
    } else {
      return this.projectsRef.doc(id).collection('revisions').doc(revisionCount).set({ //now calls with project ID, making UID false
        init: false,
        feedback: '',
        media:"",
        figma: "https://www.figma.com/file/ggEHJtusFHITsrjRhvjtJZY5/Bloomtime-Platform-v2?node-id=0%3A1", //therefore gives figma file
        completed: false, //not yet completed or approved
        approved: false,
      });
    }
  }



  //could maybe have doCreateUser... return a user object so we don't have to call doGetUser again
  doInitNewUser = (email , password, Emaillist) => { //creates a new user file based on email and password of user
      return this.doCreateEmptyProject().then( proj => { //creates new blank project
          console.log(proj); //logs to ensure running properly
          return this.doCreateUserWithEmailAndPassword(email, password, proj.id, Emaillist) //passes all user info
              .then(ref => {
                      proj.set({
                          client: [ref] //client reference number?
                      }, {merge : true});
                      return ref.id; //returns reference ID
              });
      });
  }
  get projects() { //retrieves projects from firebase
    return this.projectsRef.get().then(projs => projs.docs.map(proj => new Project(proj))); //returns new project??
  }

  doGetProject = (id, index, isUID = false) => { // return Promise<Project>
    if (isUID) { //if valid user
      return this.doGetUser(id).then(userData => this.doGetProject(userData.projects[index].id)); //gets project data
    } else {
      return this.projectsRef.doc(id).get().then(data => { //then returns project data??
        return new Project(data)
      });
  }
}

  //get array of project objects objects associated with a user
  doGetProjects = (uid) => { //gets project
      return this.doGetUser(uid).then(userData => { //gets user info
          var proms = userData.projects.map(projectRef => { //creates a promise with user project maps
              return this.doGetProject(projectRef.id).then(p => { //gets project based on reference ID
                  return p; //returns said project
              })
          })
          return Promise.all(proms).then(res => {
              return res; //returns promise with all project information
          });
      });
  }


  _doGetProjectTemplate = async (name, clientUid, designerUid) => { //passes name, client and designer ID
    let cuids = Array.isArray(clientUid) ? clientUid : [clientUid]; //client ID is an array with clients user ID
    let duids = Array.isArray(designerUid) ? designerUid : [designerUid]; //same goes for designer
    const clientRefs = await Promise.all(cuids.map(cuid => { //constant for client reference, array with all info
      return this.usersRef.doc(cuid).get().then(data => data.ref); //return user reference and data
    }));
    const designerRefs = await Promise.all(duids.map(duid => { //designer references follow same pattern as above
      return this.usersRef.doc(duid).get().then(data => data.ref);
    }));
    if (Firebase.preventBreakingChanges) { //if a breaking change would occur?
      return { name: name, client: clientRefs[0], designer: designerRefs[0] } //returns client and designer refs at index 0
    } else { //if no errors
        return { name: name, client: clientRefs, designer: designerRefs } //returns standard client and designer info
    }

  }

  _doUpdateProjectData = async (docRef, returnProject) => { //updates project data
    await Promise.all(
      [ProjectData.Brief, ProjectData.Concept, ProjectData.Final, ProjectData.Revision, ProjectData.Stage, ProjectData.Contractor].map(obj => { //arrays of all various stages
        return docRef.collection(obj.colRef).doc('0').set(new obj.type(null, true).getAll(), { merge: true }); //sets docref with new info, merges
      })
    );
    return docRef; //returns updated reference document
  }

  //clientUid = 'userAuthID', designerUid = 'l9d1ECyWoJb4tpqCAz2SnXIyHH52',
  doUpdateProject = async (name = 'Test Project', clientUid = 'Admin', designerUid = 'o0Ds4w9vFmV1l8Z3BehEVYH4wHl2', pid = null, returnProject = true) => { //test values
    const newName = name === 'Test Project' ? `Test Project ${await this.cheekyProjectNaming()}` : name; //checks that project name matches
    const projectRef = await this._doGetProjectTemplate(newName, clientUid, designerUid) //gets project template with client & designer info
      .then(project => {
        if (pid) { //if valid project id
          const docRef = this.projectsRef.doc(pid) 
          return this.projectsRef.doc(pid).set(project).then(() => docRef) //updates reference doc with project
        }
        return this.projectsRef.add(project) //returns reference doc
      }).then(this._doUpdateProjectData).catch(error => { //updates project pending no errors
        console.error('Error creating project: ', error); //if there is an error, informs user
        return false; //and returns false
      });
    if (projectRef && returnProject) //if everything happened correctly
      return this.doGetProject(projectRef.id); //returns new project info based on projectRef ID
    else return projectRef; //otherwise just returns project referencef

  }

  cheekyProjectNaming = async () => { //names project?
    const projects = await this.projects.then();
    if (projects && projects.length > 0) //if it is a valid project with length greater than 0
      return 1 + Math.max.apply(null, projects.map(p => parseInt(+p.name.split(/ /).pop()) || 0)); //returns project name based on the shown logic
    return 0;
  }

  _deleteAll(collection, deleteSubCollections = false, isProject = false) { //passes collection info
    const listener = collection.onSnapshot(docs => {
      docs.forEach(d => { //for every document
        if (deleteSubCollections) { //if it is true that we want to delete subcollections
          if (isProject) //if it is a project
            [ProjectData.Brief, ProjectData.Concept, ProjectData.Final, ProjectData.Revision, ProjectData.Stage, ProjectData.Contractor].forEach(col => {
              this._deleteAll(d.ref.collection(col.colRef), true); //delete all refs?
            });
          d.ref.delete();
        }
      });
    });
    setTimeout(() => { //waits one second
      listener();
    }, 1000);
  }
}
export default FirebaseProjects;
