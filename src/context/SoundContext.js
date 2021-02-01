<<<<<<< HEAD
import React, { createContext, useState, useRef, useEffect, useCallback  } from "react";
=======
import React, {
  createContext,
  useState,
  useRef,
  useEffect,
} from 'react';
>>>>>>> efa99095ea3e4810e509cc8bf76c08d7b73b7971

// CONTEXT
// PROVIDER

export const SoundContext = createContext(); // like createStore in Redux

const SoundProvider = (props) => {
  let iWantToGetWrapped = props.children; // app component

  const [value, setValue] = useState('sine');
  const [bufferLength, setBufferLength] = useState();
  const [dataArray, setDataArray] = useState();
  const [analyser, setAnalyser] = useState();
  const [volume, setVolume] = useState(0.5);
  const [sound, setSound] = useState();
  const [keyPressed, setKeyPressed] = useState();
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  console.log(`VALUE CONTEXTJS`, { value });

  /*   useEffect(()=>{
  (async function(){
    console.log({value})
    setValue(value)
  })();   
  },[value])
 */
<<<<<<< HEAD
  const handleChange = useCallback((event) => {
    let lastType = event.target.value
    setValue(lastType)
  },[value]);
 
=======
  const handleChange = (event) => {
    let lastType = event.target.value;
    console.log(`IM UPDATING VALUE`, lastType);
    setValue(lastType);
  };
>>>>>>> efa99095ea3e4810e509cc8bf76c08d7b73b7971

  let sharedData = {
    handleChange,
    value,
    ...setValue,
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
