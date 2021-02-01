import React, { useContext } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { SoundContext } from "../context/SoundContext";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
    background: "white",
    border: "3px solid #000",
    borderRadius: 3,
    height:180,
    width: 120,
    position: "absolute",
    margin: "auto",
    left: "470px",
    top: "155px",
  },
});

export default function RadioButtonsGroup() {
  const classes = useStyles();

  let { value, handleChange } = useContext(SoundContext);

  return (
      <div className={classes.root}>
    <FormControl component="fieldset">
      <FormLabel component="legend">Wave</FormLabel>
      <RadioGroup
       /*  aria-label="gender"
        name="gender1" */
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="sine" control={<Radio />} label="sine" />
        <FormControlLabel value="square" control={<Radio />} label="square" />
        <FormControlLabel value="triangle" control={<Radio />} label="triangle" />
        <FormControlLabel value="sawtooth" control={<Radio />} label="sawtooth" />
      </RadioGroup>
    </FormControl>
    </div>
  );
}
