import React,{Component} from 'react';
import { withAuthorization } from '../../utilities/Session';
import * as ROLES from '../../utilities/constants/roles'
import { Grid ,Sidebar, Segment , Comment, GridColumn,Menu } from "semantic-ui-react";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import '../Messaging/Messaging.css'
import backgroundTemp from '../../Images/TempBackground.PNG';
import * as ROUTES from "../../utilities/constants/routes";
import Messages from './Messages/Messages';
import SidePanel from './SidePanel/SidePanel';
import { Channel , Message } from '../../utilities/constants/database';
import { auth } from 'firebase';
import firebase from "firebase";
class Messaging extends Component {

    constructor(props){
        super(props);
        this.state = {
            loading: true,
            currentChannel: null,
            channels: [],
            messages: [], //2d arr
            newMessageCounts: [],
            currChanIndex: 0,
            isSwitchingChannels: false
        };
        this.setCurrentChannel = this.setCurrentChannel.bind(this);
        this.InitMessageListeners = this.InitMessageListeners.bind(this);
        this.addMessage = this.addMessage.bind(this);
    }

    //currentChannel is a channel object
    setCurrentChannel(chanObj, index) {
        var cpy  = [...this.state.newMessageCounts];
        cpy[index] = 0;
        this.setState({
            currentChannel: chanObj,
            newMessageCounts: cpy,
            currChanIndex: index,
            isSwitchingChannels: true,
        }, () => {
            this.props.firebase.updateChannelLastSeenTime(chanObj, this.props.firebase.user.id, firebase.firestore.Timestamp.now());
        });
    }

    //default to helpChannel
    initMessaging = async () => {
        const c = await this.props.firebase.doGetChannel(this.props.firebase.user.helpChannel.id);
        const cs = await this.props.firebase.doGetChannelsByUser(this.props.firebase.user.id);
        const ms = await this.props.firebase.doGetMessagesOfAllChannels(cs); //2D Arr
        const unseenMessCounts = await this.props.firebase.doGetNewMessageCounts(cs, this.props.firebase.user.id);
        unseenMessCounts[unseenMessCounts.length-1] = 0; //since helpChannel is auto loaded

        this.setState({
            currentChannel: c,
            channels: cs,
            messages: ms,
            newMessageCounts: unseenMessCounts,
            currChanIndex: cs.length-1
        }, () => {
            this.InitMessageListeners();
            //below line doesn't need to be there rn, but if automatic load of helpChannel changes, then we'll need it
            this.props.firebase.updateChannelLastSeenTime(c, this.props.firebase.user.id, firebase.firestore.Timestamp.now());
        });
    }

    addMessage(from, content, channelRef){
        this.props.firebase.doCreateAndAddMessageInChannel(from, content, channelRef);
        this.props.firebase.updateChannelLastSeenTime(this.state.currentChannel, this.props.firebase.user.id, firebase.firestore.Timestamp.now());
    }

    //gets called the first time no matter what
    //this function updates both newMessageCounts & message
    InitMessageListeners(){
        this.state.channels.forEach((c,i) => {
            this.props.firebase.db.collection("channels").doc(c.id)
                .onSnapshot(doc => {
                    const c = new Channel(doc);
                    let shouldAdd = false;
                    if(c.messages.length !== 0){
                        let temp = this.state.messages.map(a => [...a]);
                        let temp2 = [...this.state.newMessageCounts];
                        this.props.firebase.doGetMessageById(c.messages[c.messages.length - 1].id).then(m => {
                            if (this.state.messages[i].length === 0) {
                                temp[i] = m;
                                shouldAdd = true;
                            }
                            if (m.id !== this.state.messages[i][this.state.messages[i].length - 1].id) {
                                temp[i] = [...this.state.messages[i], m];
                                shouldAdd = true;
                            }
                            if (shouldAdd && c.id !== this.state.currentChannel.id){
                                temp2[i]++;
                            }
                            this.setState({
                                messages: temp,
                                newMessageCounts: temp2
                            });
                        });
                    }
                    this.setState({
                        loading: false,
                        isSwitchingChannels: false
                    });
                });
        })
    }

    componentWillMount(){
        this.initMessaging();
    }

    render(){
        if(this.state.loading){
            return ( <div> Loading </div>)
        }else {
            return(
                <Grid columns="equal" style={{ background: "#eee",height: '100vh'}}>
                    <SidePanel
                        newMessageCounts={this.state.newMessageCounts}
                        currentChannel={this.state.currentChannel}
                        channels={this.state.channels}
                        setCurrentChannel={this.setCurrentChannel}
                    />
                    <Grid.Column>
                        <Messages
                            loading={this.state.isSwitchingChannels}
                            messages={this.state.messages[this.state.currChanIndex]}
                            firebase={this.props.firebase}
                            currentChannel={this.state.currentChannel}
                            addMessage={this.addMessage}
                        />
                    </Grid.Column>
                </Grid>
            )
        }
    }
}


const condition = role => role > 0

export default withAuthorization(condition)(Messaging);
