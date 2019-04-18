import React from 'react';
import { Form, Input } from 'semantic-ui-react';

class EditGoal extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            id:'',
            content:''
        }
    }

    handleChange = (e) => {
        this.setState({content: e.target.value});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.editGoalSubmit(this.state);
        this.setState({
            content: ''
        });
    }

    componentDidMount(){
        this.setState({id: this.props.goal.id, content: this.props.goal.content});
    }

    render(){
        return(
            <Form onSubmit={this.handleSubmit}>
                <Input value={this.state.content} onChange={this.handleChange} />
            </Form>
        )
    }
}

export default EditGoal;