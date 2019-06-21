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
            messages: [],
            lastVisited: [firebase.firestore.Timestamp.now(), firebase.firestore.Timestamp.now()]
        });
        return chan;
    }

    //hv97h9sMeuN1tFQPolJvNE4scMZ2 is default designer id
    doInitNewUser = (email , password , name) => {
        return this.doGetUser('userAuthID').then( des => {
            return this.doGetUser('userAuthID').then( admin => {
                const chanDefault = this.doCreateEmptyChannel();
                const chanProj = this.doCreateEmptyChannel();
                return this.doCreateEmptyProject().then(proj => {
                    return this.doCreateUserWithEmailAndPassword(email, password, proj.cols.id, chanDefault, name)
                        .then(ref => {
                            proj.cols.set({
                                client: [ref],
                                channel: chanProj,
                            }, {merge: true});

                            chanProj.set({
                                name: name + "'s Project 1",
                                p1: ref,
                                p2: des.ref
                            }, {merge:true});

                            chanDefault.set({
                                p1: ref,
                                p2: admin.ref
                            }, {merge: true});

                            return ref.id;
                    });
                });
            })
        })
    }
}

export default FirebaseChannels;
