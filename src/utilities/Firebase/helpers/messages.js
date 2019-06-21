import channels from './channels';
import firebase from "firebase";
import { Message } from '../../constants/database';

class FirebaseMessages extends channels {
    constructor() {
        super();
    }
    /*Could implement a way of adding messages to database in batches: ie, store / display locally for now, then write
    to database when user navigates away */

    doCreateAndAddMessageInChannel(sentFrom, content, channelRef){
        const messageRef = this.messagesRef.doc();
        return messageRef.set({
            from: sentFrom, //string
            time: firebase.firestore.Timestamp.now(),
            content: content,
        })
        .then(() => {
            channelRef.set({
                messages: firebase.firestore.FieldValue.arrayUnion(messageRef)
            }, {merge: true})
        })
        .then( () => {
            return messageRef.get().then(data => {
                return new Message(data);
            })
        });
    }

    updateChannelLastSeenTime(channel, uid, ts){

        this.doGetChannel(channel.id).then( c => {
            c.p1.id === uid ? channel.lastVisited = [ts, c.lastVisited[1]] : channel.lastVisited = [c.lastVisited[0], ts]
        });
    }
    //ordering: project 1, project 2, ..., helpChannel

    //returns 2D arr
    async doGetMessagesOfAllChannels(channels){
        let res = [];
        for(let i=0; i<channels.length; i++) {
            const m = await this.doGetMessagesByChannel(channels[i].id);
            res.push(m);
        }
        return res;
    }

    async doGetNewMessageCounts(channels, uid) {
        let res = [];
        for(let i=0; i<channels.length; i++) {
            const m = await this.doGetMessagesByChannel(channels[i].id);
            var lastCheckedTime;
            channels[i].p1.id === uid ? lastCheckedTime = channels[i].lastVisited[0] : lastCheckedTime = channels[i].lastVisited[1];
            let count=0;
            for(let j=0; j<m.length; j++){
                if(m[j].time.toMillis() > lastCheckedTime.toMillis()){
                    count++;
                }
            }
            res.push(count);
            count = 0;
        }
        return res;
    }

    async doGetMessagesByChannel(channelId) {
        const c = await this.doGetChannel(channelId);
        var temp = [];
        for(var i=0; i<c.messages.length; i++){
            temp.push(this.doGetMessage(c.messages[i]));
        }
        return Promise.all(temp);
    }

    doGetMessage(ref) {
        return ref.get().then(data => {
            return new Message(data);
        })
    }

    doGetMessageById(id){
        return this.messagesRef.doc(id).get().then(doc => {
            return new Message(doc);
        });
    }
}
export default FirebaseMessages;
