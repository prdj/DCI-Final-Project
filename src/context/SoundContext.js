import React, { createContext, useState } from 'react';

// CONTEXT
// PROVIDER

export const SoundContext = createContext() // like createStore in Redux

const SoundProvider = (props) => {
  
  let iWantToGetWrapped = props.children  // app component 

  const [volume, setVolume] = useState(0.4);
  const [sound, setSound] = useState();


  // share this with the world
  let sharedData = {
    sound,
    setSound,
    volume,
    setVolume
  }

  return (
    <SoundContext.Provider value={sharedData}>
      { iWantToGetWrapped }
    </SoundContext.Provider>
  )

}

export default SoundProvider
