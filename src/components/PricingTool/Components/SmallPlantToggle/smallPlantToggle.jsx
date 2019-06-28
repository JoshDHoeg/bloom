// import React from 'react'
// import { makeStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
// import Slider from '@material-ui/lab/Slider';
// import Grid from '@material-ui/core/Grid'

// // const smallPlantToggle = (props) => {
//     const useStyles = makeStyles(theme => ({
//         root: {
//             width: 200,
//         },
//     }))

//     export default function ContinuosSlider() {
//         const classes = useStyles();
//         const [value, setValue] = React.useState(30);
//         const handleChange = (event, newValue) => {
//             setValue(newValue);
//     };

//     return(
//         <div className={classes.root}>
//             <Typography id='continuous-slider' gutterBottom>
//                 Density
//             </Typography>
//             <Grid container spacing={2}>
//                 <Grid item>
//                     <Typography variant='h3'>
//                         Low
//                     </Typography>
//                 </Grid>
//                 <Grid item xs>
//                     <Slider value={value} onChange={handleChange} aria-labelledby='continuous-slider'/>
//                 </Grid>
//                 <Grid item>
//                     <Typography variant='h3'>
//                         High
//                     </Typography>
//                 </Grid>
//             </Grid>
//             <Slider disabled defaultValue={30} area-labelledby='continuous-slider' />
//         </div>
//     )
// }

// export default(smallPlantToggle)