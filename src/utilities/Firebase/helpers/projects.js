import FirebaseAuthUser from './authUser';
import { ProjectData, Project } from '../../constants/database';

class FirebaseProjects extends FirebaseAuthUser  {
  constructor() {
    super();
    console.log('projects');
  }
  get projects() {
    return this.projectsRef.get().then(projs => projs.docs.map(proj => new Project(proj)));
  }

  doGetProject = (id, isUID = false) => { // return Promise<Project>
    if (isUID)
      return this.doGetUser(id).then(userData => this.doGetProject(userData.projects[0].id));
    else
      return this.projectsRef.doc(id).get().then(data => new Project(data));
  }
  _doGetProjectTemplate = async (name, clientUid, designerUid) => {
    const clientData = await this.usersRef.doc(clientUid).get();
    const designerData = await this.usersRef.doc(designerUid).get();
    return { name: name, client: clientData.ref, designer: designerData.ref }
  }
  _doUpdateProjectData = async (docRef, returnProject) => {
    await docRef.collection(ProjectData.Brief.colRef).doc('0').set({ init: false }, { merge: true });
    await docRef.collection(ProjectData.Concept.colRef).doc('0').set({ init: false }, { merge: true });
    await docRef.collection(ProjectData.Final.colRef).doc('0').set({ init: false }, { merge: true });
    await docRef.collection(ProjectData.Revision.colRef).doc('0').set({ init: false }, { merge: true });
    return docRef;
  }

  doCreateProject = async (name = 'Test Project', clientUid = 'userAuthID', designerUid = 'l9d1ECyWoJb4tpqCAz2SnXIyHH52', returnProject = true) => {
    const newName = name === 'Test Project' ? `Test Project ${await this.cheekyProjectNaming()}` : name;
    const projectRef = await this._doGetProjectTemplate(newName, clientUid, designerUid)
      .then(project => this.projectsRef.add(project))
      .then(this._doUpdateProjectData).catch(error => {
        console.error('Error creating project: ', error);
        return false;
      });
    if (projectRef && returnProject)
      return this.doGetProject(projectRef.id);
    else return projectRef;

  }
  // TODO: this batch write can actually be removed
  doUpdateProject = async (projectId, name, clientUid, designerUid, returnProject = true) => {
    const docRef = this.projectsRef.doc(projectId)
    const projectRef = await this._doGetProjectTemplate(name, clientUid, designerUid)
      .then(project => docRef.set(project), { merge: true })
      .then(() => docRef).then(this._doUpdateProjectData).catch(error => {
        console.error('Error updating project: ', error);
        return false;
      }
      );
    if (projectRef && returnProject)
      return this.doGetProject(projectRef.id);
    else return projectRef;
  }

  cheekyProjectNaming = () => this.projects.then(projects => projects.length > 0 ?
    projects.map(p => parseInt(+p.name.split(/ /).pop()) || 0) : -1)
    .then(n => 1 + Math.max.apply(null, n));
}
export default FirebaseProjects;