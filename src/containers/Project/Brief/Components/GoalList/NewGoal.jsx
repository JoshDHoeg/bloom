import React from 'react';

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
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Add New Goal</label>
                    <input  type="text"  onChange={this.handleChange} />
                </form>
            </div>
        )
    }
}

export default NewGoal;