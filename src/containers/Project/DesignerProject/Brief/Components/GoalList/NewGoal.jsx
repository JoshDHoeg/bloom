import React from 'react';
import { Form, Input } from 'semantic-ui-react';

class NewGoal extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            content:''
        }
    }

    handleChange = (e) => {
        this.setState({content: e.target.value});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addGoal(this.state);
        
        this.setState({
            content: ''
        });
        console.log("reset");
    }

    render(){
        return(
            <Form onSubmit={this.handleSubmit}>
                <Input value={this.state.content} onChange={this.handleChange} placeholder="Add New Goal"/>
            </Form>
        )
    }
}

export default NewGoal;