import React, {Component} from 'react'
import { Grid, Divider, Segment, Button, Header} from 'semantic-ui-react';
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
            <Segment>
                <Header>Hey we found three quotes for you!</Header>
                {this.props.quotes.map(quote => 
                <Segment placeholder>
                <Grid columns={2} stackable textAlign='center'>
                  <Divider vertical></Divider>
            
                  <Grid.Row verticalAlign='middle'>
                    <Grid.Column>
                        <div>{quote.name}</div>
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
            </Segment>
        );
    }
}
const condition = authUser => !!authUser;

export default withAuthorization(condition)(Completed)