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
        messageRef.set({
            from: sentFrom, //string
            time: firebase.firestore.FieldValue.serverTimestamp(),
            content: content,
        })
        channelRef.set({
            messages: firebase.firestore.FieldValue.arrayUnion(messageRef)
        }, {merge: true})

        return messageRef.get().then(data => {
            return new Message(data);
        })
    }

    async doGetMessagesByChannel(channelRef) {
        const c = await this.doGetChannel(channelRef.id);
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
}
export default FirebaseMessages;
