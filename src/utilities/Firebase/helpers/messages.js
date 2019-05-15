import channels from './channels';
import firebase from "firebase";
import { Message } from '../../constants/database';

class FirebaseMessages extends channels {
    constructor() {
        super();
    }

    doGetMessage(ref){
        const m = ref.get().then(data => {
            return new Message(data);
        })
        return m;
    }

    doCreateAndAddMessageInChannel(sentFromId, sentToId, content, channelRef){
        const messageRef = this.messagesRef.doc();
        messageRef.set({
            from: sentFromId,
            to: sentToId,
            time: firebase.firestore.FieldValue.serverTimestamp(),
            content: content,   //string
        });
        channelRef.set({
            messages: firebase.firestore.FieldValue.arrayUnion(messageRef)
        }, {merge: true});
    }

    async doGetMessagesByChannel(channelRef) {
        const c = await this.doGetChannel(channelRef.id);
        console.log(c);
        var temp = [];
        for(var i=0; i<c.messages.length; i++){
            temp.push(this.doGetMessage(c[i]));
        }
        return Promise.all(temp);

    }
}
export default FirebaseMessages;
