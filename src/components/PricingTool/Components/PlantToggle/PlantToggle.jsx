import React, {Component} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid'

class SmallPlantToggle extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render(){
        return(
            <Grid style={{paddingTop:'20px', paddingBottom:'20px', width:'100%'}}>
                <Slider 
                    min={this.props.Min} 
                    valueLabelDisplay="on" 
                    max={this.props.Max} 
                    value={this.props.value} 
                    valueLabelDisplay="auto"
                    onChange={this.props.handleChange}
                    disabled={this.props.disabled}
                />
                <Typography>
                    ${this.props.value}
                </Typography>
            </Grid>
        )
    }
}

export default(SmallPlantToggle)