import React, {Component} from 'react'
import {withAuthorization} from '../../utilities/Session'
import logo from '../../Images/TempLogo.JPG';
import { Segment, Grid } from 'semantic-ui-react'

class Waiting extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            edit: false,
            title: '',
            src: '',
            message: '',
        }
    }
    
    componentDidMount(){
        // if(this.props.state === 'concept'){
        //     this.setState({
        //         title: 'Concept',
        //         src: logo,
        //         message: 'Your Concept is not ready yet. You will receive a notification when it is ready'
        //     })
        // }
        if(this.props.state === 'draft'){
            this.setState({
                title: 'Draft',
                src: logo,
                message: 'Your Draft is not ready yet. You will receive a notification when it is ready'
            })
        }
        else if(this.props.state === 'final'){
            this.setState({
                title: 'Final',
                src: logo,
                message: 'Your Final is not ready yet. You will receive a notification when it is ready'
            })
        }
        else if(this.props.state === 'revision'){
            this.setState({
                title: 'Revision',
                src: logo,
                message: 'Your Revision is not ready yet. You will receive a notification when it is ready'
            })
        }
        else{
            this.setState({
                title: 'Concept',
                src: logo,
                message: 'Your Concept is not ready yet. You will receive a notification when it is ready'
            })
        }
    }


    render(){
        return(
            <Segment>
                <Grid.Column style={{textAlign: 'center', paddingBottom: '15px'}}>
                    <div style={{fontSize:'30px', fontWeight:'bold'}}>{this.state.title}</div>
                </Grid.Column>
                <Grid.Column style={{textAlign: 'center',paddingBottom: '15px'}}>
                    <img src={this.state.src}/>
                </Grid.Column>
                <Grid.Column style={{textAlign: 'center'}}>
                    <div style={{fontSize:'16px'}}>{this.state.message}</div>
                </Grid.Column>
            </Segment>
        );
    }

}
const condition = authUser => !!authUser;

export default withAuthorization(condition)(Waiting);
