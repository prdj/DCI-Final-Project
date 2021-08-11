import React, { useContext, useEffect, useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { SoundContext } from "../context/SoundContext";
import { makeStyles } from "@material-ui/core/styles";
import { arrayNotes } from "./Format";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    alignContent: "center",
    background: "",
    border: "3px solid #000",
    borderRadius: 3,
    height: 180,
    width: 120,
    position: "absolute",
    margin: "auto",
    left: "690px",
    top: "155px",
  }
});

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

export default function RadioButtonsGroup() {
  const classes = useStyles();

  let { setocillatorNode } = useContext(
    SoundContext
  );

  let [value, setValue] = useState('square')
  
  /* const createNoteArray = (event) => {
    
    let lastType = event.target.value
    setValue(lastType);
    inicializeNodeArray()

    
  }; */
  const inicializeNodeArray = ()=>{
    let oscNodes = [];
    arrayNotes.forEach((item, index) => {
      /* let osc = audioCtx.createOscillator();
      osc.frequency.value = item.pitchNumber; */
      item.type = value;
      /* osc.start(); */
      oscNodes.push(item);
      
    });
    
    setocillatorNode(oscNodes);
  }


  useEffect(() => {
 console.log("Value Changes")
    /* createNoteArray(); */
    inicializeNodeArray()
    
  }, [value]);

  return (
    <div className={classes.root}>
      <FormControl component="fieldset">
        <FormLabel style={{
          fontFamily: "Big Shoulders Stencil Text",
          fontSize: 20,
          marginLeft:35,
          padding:0,
          color:'black'
      
        }} 
        component="legend">Wave</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={value}
          onClick={(e)=> setValue(e.target.value)}
        >
          <FormControlLabel 
            value="sine" 
            control={<Radio 
            color ="primary"/>} 
            label="sine" 
          />

          <FormControlLabel 
            value="square" 
            control={<Radio />} 
            label="square" 
          />

          <FormControlLabel
            value="triangle"
            control={<Radio />}
            label="triangle"
          />
          <FormControlLabel
            value="sawtooth"
            control={<Radio />}
            label="sawtooth"
          />
          
        </RadioGroup>
      </FormControl>
    </div>
  );
}
