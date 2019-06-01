import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Container, Header } from 'semantic-ui-react';

//IMPROT UTILITIES
import { withAuthorization } from '../../../../../utilities/Session';

class Approve extends React.Component{
    render(){
        return (
            <div>
                <Grid style={{textAlign: "center", backgroundRepeat: 'repeat', marginLeft: "-14px", paddingLeft: "14px", paddingBottom: "100vh" }}>
                    <Container>
                        <br/>
                        <br/>
                        <Header as='h1'>Terms of service</Header>
                    </Container>
                </Grid>
            </div>
        )
    }
}

const condition = role => role > 0;
export default withAuthorization(condition)(Approve);
