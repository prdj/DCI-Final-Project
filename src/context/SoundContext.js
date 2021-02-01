import React, { createContext, useState, useRef, useEffect, useCallback  } from "react";

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

  console.log({ analyser });
  

/*   useEffect(()=>{
  (async function(){
    console.log({value})
    setValue(value)
  })();   
  },[value])
 */
  const handleChange = useCallback((event) => {
    let lastType = event.target.value
    setValue(lastType)
  },[value]);
 

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
