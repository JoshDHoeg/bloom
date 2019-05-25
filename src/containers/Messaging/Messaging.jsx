import React,{Component} from 'react';
import { withAuthorization } from '../../utilities/Session';

import { Grid ,Sidebar, Segment , Comment, GridColumn,Menu } from "semantic-ui-react";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import backgroundTemp from '../../Images/TempBackground.PNG';
import * as ROUTES from "../../utilities/constants/routes";
import Messages from './Messages/Messages';
import SidePanel from './SidePanel/SidePanel';
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
        this.setState({currentChannel: chanObj})
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
            return ( <div> Loading </div>)
        }else {
            return(
                <Grid columns="equal" style={{ background: "#eee",height: '100vh'}}>
                    <SidePanel
                        currentChannel={this.state.currentChannel}
                        channels={this.state.channels}
                        setCurrentChannel={this.setCurrentChannel}
                    />
                    <Grid.Column >
                        <Messages
                            messages={this.state.messages}
                            firebase={this.props.firebase}
                            currentChannel={this.state.currentChannel}
                        />
                    </Grid.Column>
                </Grid>
            )
        }
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Messaging);
