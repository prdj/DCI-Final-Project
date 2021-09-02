import React, { createContext, useState, useRef, useEffect, useCallback  } from "react";
import { arrayNotes } from "../components/Format";


// CONTEXT
// PROVIDER

export const SoundContext = createContext(); // like createStore in Redux

const SoundProvider = (props) => {
  let iWantToGetWrapped = props.children; // app component
  const [command, setCommand] = useState(arrayNotes);
  const [note, setNote] = useState(arrayNotes);
  const [velocity, setVelocity] = useState(arrayNotes);
  const [oscillatorNode, setocillatorNode] = useState(arrayNotes);
  const [bufferLength, setBufferLength] = useState();
  const [dataArray, setDataArray] = useState();
  const [analyser, setAnalyser] = useState();
  const [volume, setVolume] = useState(arrayNotes);
  const [sound, setSound] = useState();
  const [keyPressed, setKeyPressed] = useState();
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

/*   const handleChange = (event) => {
    let lastType = event.target.value
    setValue(lastType);

  }; */



  let sharedData = {
    velocity,
    setVelocity,
    note,
    setNote,
    command,
    setCommand,
    oscillatorNode,
    setocillatorNode,
    bufferLength,
    setBufferLength,
    dataArray,
    setDataArray,
    canvasRef,
    contextRef,
    analyser,
    setAnalyser,
    sound,
    setSound,
    volume,
    setVolume,
    keyPressed,
    setKeyPressed,
  };

  return (
    <SoundContext.Provider value={sharedData}>
      {iWantToGetWrapped}
    </SoundContext.Provider>
  );
  
};

export default SoundProvider;
