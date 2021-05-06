import React, { useState } from "react";
import Slider from "@material-ui/core/Slider";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    width: 140,
    height: 180,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    alignContent: "center",
    background: "",
    border: "3px solid #000",
    borderRadius: 3,
    position: "absolute",
    margin: "auto",
    left: "400px",
    top: "155px",
  },
  inerRoot: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    padding: 5,
    marginLeft: 0,
    border: "2px solid #000",
    borderRadius: 3,
  },
});

export default function LFO() {
  const classes = useStyles();
  let [lfoRate, setLfoRate] = useState(0.5);
  let [lfoDelay, setLfoDelay] = useState(0.5);

  const handleChange = (event, newValue) => {
    setLfoRate(newValue);
    
  };

  const handleChangeDelay = (event, newValue) => {
   
    setLfoDelay(newValue)
  };

  return (
    <div className={classes.root}>
      <div className={classes.inerRoot}>
        <Grid
          container
          style={{
            margin: 0,
            width: 39,
          }}
          spacing={2}
        >
          <Grid item xs>
            <Slider
              style={{
                height: 100,
                padding: "0 10px",
                color: "black",
              }}
              orientation="vertical"
              value={lfoRate}
              valueLabelDisplay="auto"
              onChange={handleChange}
              aria-labelledby="vertical-accessible-slider"
              min={0}
              step={0.01}
              max={1}
            />
          </Grid>
        </Grid>
        <Typography
          style={{
            fontFamily: "Big Shoulders Stencil Text",
            fontSize: 15,
            padding: 0,
            margin: 5,
          }}
          id="vertical-slider"
          gutterBottom
        >
          Rate
        </Typography>
      </div>
      <div className={classes.inerRoot}>
        <Grid
          container
          style={{
            margin: 0,
            width: 39,
          }}
          spacing={2}
        >
          <Grid item xs>
            <Slider
              style={{
                height: 100,
                padding: "0 10px",
                color: "black",
              }}
              orientation="vertical"
              value={lfoDelay}
              valueLabelDisplay="auto"
              onChange={handleChangeDelay}
              aria-labelledby="vertical-accessible-slider"
              min={0}
              step={0.01}
              max={1}
            />
          </Grid>
        </Grid>
        <Typography
          style={{
            fontFamily: "Big Shoulders Stencil Text",
            fontSize: 15,
            padding: 0,
            margin: 5,
          }}
          id="vertical-slider"
          gutterBottom
        >
          Delay
        </Typography>
      </div>
    </div>
  );
}
