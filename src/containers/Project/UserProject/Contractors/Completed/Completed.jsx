import React, {Component} from 'react'
import { Grid, Divider, Segment, Button, Header, Container} from 'semantic-ui-react';
import { withAuthorization } from '../../../../../utilities/Session';

class Completed extends Component {
    constructor(props){
        super(props);
        this.state = {
            isWaiting: true
        }
    }
    render(){
        return(
            <div>
                <Grid style={{textAlign: "center", backgroundRepeat: 'repeat', marginLeft: "-14px", paddingLeft: "14px", paddingBottom: "100vh" }}>
                    <Grid.Column width={3} />
                    <Grid.Column width={9}>
                        <Header>Hey we found three quotes for you!</Header>
                        {this.props.quotes.map(quote => 
                        <Segment>
                            <Grid columns={2} stackable textAlign='center'>
                                <Grid.Row >
                                    <Grid.Column>
                                        <Header>{quote.name}</Header>
                                        <div>{quote.stars}</div>
                                    </Grid.Column>
                            
                                    <Grid.Column>
                                        <div>{quote.price}</div>
                                    <Button primary>Contact</Button>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Segment>
                        )}
                    </Grid.Column>
                </Grid>
                </div>
        );
    }
}
const condition = authUser => !!authUser;

export default withAuthorization(condition)(Completed)