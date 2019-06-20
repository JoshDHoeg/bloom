import Spinner from 'react-spinner-material';
import React, {Component} from 'react'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

class Loading extends Component {
render(){
    return (
        <Segment marginBottom='300px'>
                <Dimmer active>
                    <Loader size='large' >Loading</Loader>
                </Dimmer>
                <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
        </Segment>
    )
}

}



export default (Loading)