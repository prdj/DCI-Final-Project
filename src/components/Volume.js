import React, { useContext, useEffect, useState } from "react";
import Slider from "@material-ui/core/Slider";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import VolumeDown from "@material-ui/icons/VolumeDown";
import VolumeUp from "@material-ui/icons/VolumeUp";
import "../scss/App.scss";
import "./Style.css";
import { SoundContext } from "../context/SoundContext";
import { arrayNotes } from "./Format";


const useStyles = makeStyles({
  root: {
    width: 50,
    height: 180,
    display: "flex",
    flexDirection: "column-reverse",
    alignItems: "center",
    justifyContent: "space-evenly",
    alignContent: "center",
    background: "white",
    border: "3px solid #000",
    borderRadius: 3,
    position: "absolute",
    margin: "auto",
    left: "1100px",
    top: "155px",
  },
});

const Volume = () => {
  const classes = useStyles();
  
  let { setVolume } = useContext(SoundContext);
  

  const [value, setValue] = useState(1);

  const inicializeNodeVolume = () => {

    let volumeArray = [];
    arrayNotes.forEach((x, index) => {

      x.vol = value;
      volumeArray.push(x);
    });
    setVolume(volumeArray);
  }

  useEffect(()=> {
    inicializeNodeVolume()
  }, [value]);

  const handleChange = (event, newValue) => {
   
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        style={{
          margin: 0,
          width: 39,
        }}
        spacing={2}
      >
        <Grid item>
          <VolumeUp />
        </Grid>

        <Grid item xs>
          <Slider
            style={{
              height: 50,
              padding: "0 10px",
              color: "black",
            }}
            orientation="vertical"
            value={value}
            valueLabelDisplay="auto"
            onChange={handleChange}
            aria-labelledby="vertical-accessible-slider"
            min={0}
            step={0.01}
            max={1}
          />
        </Grid>
        <Grid item>
          <VolumeDown />
        </Grid>
      </Grid>
      <Typography
        style={{
          fontFamily: "Big Shoulders Stencil Text",
          fontSize: 15,
          padding:0,
          margin:5,
        }}
        id="vertical-slider"
        gutterBottom
      >
        Volume
      </Typography>
    </div>
  );
};

export default Volume;
