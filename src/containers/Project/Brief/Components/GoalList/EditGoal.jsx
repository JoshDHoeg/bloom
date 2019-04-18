import React from 'react';

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
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input  type="text"  value={this.state.content} onChange={this.handleChange} />
                </form>
            </div>
        )
    }
}

export default EditGoal;