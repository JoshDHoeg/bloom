import React,{Component} from 'react';
import { withAuthorization } from '../../utilities/Session';
import * as ROLES from '../../utilities/constants/roles'
import { Grid ,Sidebar, Segment , Comment, GridColumn,Menu } from "semantic-ui-react";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import '../Messaging/Messaging.scss'
import backgroundTemp from '../../Images/TempBackground.PNG';
import * as ROUTES from "../../utilities/constants/routes";
import Messages from './Messages/Messages';
import SidePanel from './SidePanel/SidePanel';
import { auth } from 'firebase';
import Loading from '../../components/Loading/Loading';
class Messaging extends Component {

    constructor(props){
        super(props);
        this.state = {
            loading: true,
            currentChannel: null,
            channels: [],
            messages: []
        }
        this.setCurrentChannel = this.setCurrentChannel.bind(this);
    }

    //currentChannel is a channel object
    setCurrentChannel(chanObj) {
        this.setState({currentChannel: chanObj},
        console.log("SetCurrentChannel is triggered"))
    }

    //do all expensive calls to firebase in parent component => child components will load immediately & better UI
    initMessaging = async () => {
        const c = await this.props.firebase.doGetChannel(this.props.firebase.user.helpChannel.id);
        const cs = await this.props.firebase.doGetChannelsByUser(this.props.firebase.user.id);
        const ms = await this.props.firebase.doGetMessagesByChannel(this.props.firebase.user.helpChannel.id);
        this.setState({
            currentChannel: c,
            channels: cs,
            messages: ms,
            loading: false
        });
    }

    componentWillMount(){
        this.initMessaging();
    }

    render(){
        if(this.state.loading){
            return (
                <Grid columns="equal" style={{ background: "#eee",height: '50vh',width:'40vh',stretched:true}} >
                     <Loading />
                     </Grid>
                     )
        }else {
            return(
                <div className = "MessagePop">
                <Grid columns="equal" style={{ background: "#eee",height: '50vh',stretched:true}} >
                    <Grid.Column>
                        <Messages
                            messages={this.state.messages}
                            firebase={this.props.firebase}
                            currentChannel={this.state.currentChannel}
                            channels={this.state.channels}
                            setCurrentChannel={this.setCurrentChannel}
                        />
                    </Grid.Column>
                </Grid>
                </div>
            )
        }
    }
}


const condition = role => role > 0

export default withAuthorization(condition)(Messaging);
