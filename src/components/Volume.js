import React from 'react';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import '../scss/App.scss';
import './Style.css';

const useStyles = makeStyles({
  
    root: {
      width: 50,
      height:200,
      display: 'flex',
      flexDirection:'column-reverse',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      alignContent:'flex-start',
      background: "white",
      borderRadius: 3,
      position: "relative",
      margin: "20vh auto",
    },
   
  });


const Volume = () => {
    const [value, setValue] = React.useState(30);
    const classes = useStyles();
    const handleChange = (event, newValue) => {
    setValue(newValue);
  };
    return(
     
      
     <div className={classes.root}>
        <Typography style={{
            fontFamily:'Big Shoulders Stencil Text',
            fontSize:14,
        }} id="vertical-slider" gutterBottom>
        Volume
        </Typography>

        <Grid container style={{
            margin:0,
            width:39,
        }} spacing={2}>
        <Grid item>
          <VolumeUp />
        </Grid>

        <Grid item xs> 
                <Slider 
                        style={{
                            height:70,
                            padding: '0 10px',
                            color:"black",         
                        }}
                        orientation="vertical"
                        value={value} 
                        valueLabelDisplay="auto"
                        onChange={handleChange}
                        aria-labelledby="vertical-slider"
                        />
        </Grid>

        <Grid item>
          <VolumeDown />
        </Grid>
        </Grid>
    </div>


    
    )

};

export default Volume;