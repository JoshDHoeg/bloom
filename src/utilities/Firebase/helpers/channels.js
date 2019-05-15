import FirebaseProjects from "./projects.js";
import { Project } from '../../constants/database';
import firebase from 'firebase';
import { Channel } from '../../constants/database'

class FirebaseChannels extends FirebaseProjects {
    constructor() {
        super();
    }

    //get a specific channel from firebase by id
    doGetChannel = (channelId) => {
        return this.channelsRef.doc(channelId).get().then(data => {
            return new Channel(data);
        })
    }

    //return both user objects associated with a channel id
    doGetUsersByChannel = (channelId) => {
        return this.doGetChannel(channelId).then(chan => {
            var arr = [];
            arr.push(this.doGetUser(chan.p1.id).then(user => {return user;}));
            arr.push(this.doGetUser(chan.p2.id).then(user => {return user;}));
            return Promise.all(arr);
        })
    }

    //get all channels associated with a userid
    doGetChannelsByUser = (uid) => {
        return this.doGetProjects(uid).then( projList => {
            var proms = projList.map(proj => {
                return proj.channel.get().then(data => {
                    return new Channel(data);
                });
            });
            proms.push(this.user._helpChannel.get().then(data => {
                return new Channel(data);
            }));
            return Promise.all(proms).then(res => {
                return res;
            })
        })
    }

    doCreateEmptyChannel = () => {
        const chan = this.channelsRef.doc();
        chan.set({
            name: "Help Channel",
            p1: null,
            p2: null,
            messages: []
        });
        return chan;
    }

    //hv97h9sMeuN1tFQPolJvNE4scMZ2 is default designer id
    doInitNewUser = (email , password) => {
        return this.doGetUser('hv97h9sMeuN1tFQPolJvNE4scMZ2').then( des => {
            return this.doGetUser('Admin').then( admin => {
                console.log(admin);
                const chanDefault = this.doCreateEmptyChannel();
                const chanProj = this.doCreateEmptyChannel();
                console.log("here");
                return this.doCreateEmptyProject().then(proj => {
                    console.log(proj);
                    return this.doCreateUserWithEmailAndPassword(email, password, proj.cols.id, chanDefault)
                        .then(ref => {
                            console.log(ref);
                            proj.cols.set({
                                client: [ref],
                                channel: chanProj,
                            }, {merge: true});

                            chanProj.set({
                                name: proj.name,
                                p1: ref,
                                p2: des.ref
                            }, {merge:true});

                            chanDefault.set({
                                p1: ref,
                                p2: admin.ref
                            }, {merge: true});

                            console.log("done");
                            return ref.id;
                    });
                });
            })
        })
    }
}

export default FirebaseChannels;
