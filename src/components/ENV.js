import React from "react";
import { SoundContext } from "../context/SoundContext";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { FullscreenExit } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignContent: "center",
    width: 130,
    height:180,
    position: "absolute",
    margin: "auto",
    left: "300px",
    top: "155px",
    border: "3px solid #000",
    borderRadius: 3,
    padding:5,
  },
  inerRoot: {
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "row",
    padding:0,
    marginLeft:-5,
    /* border: "2px solid #000",
    borderRadius: 2,
    width:140,
    padding:5, */


  }
}));

const PrettoSlider = withStyles({
  root: {
    color: "#52af77",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

export default function ENV() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.inerRoot}>
      <Typography
        style={{
          fontFamily: "Big Shoulders Stencil Text",
          fontSize: 12,
          padding: 5,
          margin: 2,
        }}
        gutterBottom
      >
        Attack
      </Typography>
      <PrettoSlider
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        defaultValue={0.5}
        min={0}
        step={0.01}
        max={1}
      />
      </div>
      <div className={classes.inerRoot}>
    
      <Typography
        style={{
          fontFamily: "Big Shoulders Stencil Text",
          fontSize: 12,
          padding: 5,
          margin: 2,
        }}
        gutterBottom
      >
        Decay
      </Typography>
      <PrettoSlider
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        defaultValue={0.5}
        min={0}
        step={0.01}
        max={1}
      />
      </div>
      <div className={classes.inerRoot}>
      <Typography
        style={{
          fontFamily: "Big Shoulders Stencil Text",
          fontSize: 12,
          padding: 5,
          margin: 2,
        }}
        gutterBottom
      >
        Sustain
      </Typography>
      <PrettoSlider
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        defaultValue={0.5}
        min={0}
        step={0.01}
        max={1}
      />
      </div>
      <div className={classes.inerRoot}>
      <Typography
        style={{
          fontFamily: "Big Shoulders Stencil Text",
          fontSize: 12,
          padding: 5,
          margin: 2,
        }}
        gutterBottom
      >
        Release
      </Typography>
      <PrettoSlider
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        defaultValue={0.5}
        min={0}
        step={0.01}
        max={1}      
        />
      </div>
    </div>
  );
}
