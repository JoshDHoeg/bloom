// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';

//IMPORT UTILITIES
// import { withFirebase } from '../../utilities/Firebase';
import { withAuthorization } from '../../utilities/Session';

// import { format } from 'path';
// import {Link} from "react-router-dom";
import { Grid } from 'semantic-ui-react';
import ProjCard from "../../components/ProjectCard.jsx"
import * as ROUTES from "../../utilities/constants/routes";

class ProjectList extends Component {
  userSub;
  projKeyArr;
  userProjs = [];

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      users: []
    };

    //assuming that user will always have _objects property...
      console.log(this.props.firebase.user._projects);
    this.projKeyArr = this.props.firebase.user._projects.map(x => x.id);
    this.projKeyArr.forEach(p => this.props.firebase.doGetProject(p).then(res => this.userProjs.push(res)));
    //extract other relevant projec data here?
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.userSub = this.props.firebase.onUser().subscribe(users => {
      this.setState({
        users: users,
        loading: false
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.onUser(this.userSub);
  }

  render() {
    console.log("rendered");
    const { loading } = this.state;
    //console.log(this.userProjs[0]);
    let m = 0;
    return (
      <Grid container >
        <Grid.Row>
          <h1>Current Projects</h1>
        </Grid.Row>
        {loading && <div>Loading ...</div>}
        {this.userProjs.map((proj, index) => {
          return (<ProjCard proj={proj} key={proj.name} projectIndex={index} />);
        })}
    </Grid>
    );
  }
}


const condition = authUser => !!authUser;

export default withAuthorization(condition)(ProjectList);
