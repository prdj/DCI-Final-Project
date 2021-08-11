import { arrayNotes } from "./Format";
import styled from "styled-components";
import Note from "./Note";
import KeyFunctions from "./KeyFunctions";
import React, { useEffect, useContext } from "react";
import { SoundContext } from "../context/SoundContext";

// SETTING UP AUDIO CONTEXT API
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const biquadFilter = audioCtx.createBiquadFilter();
const convolver = audioCtx.createConvolver();

// CREATING The PIANO
const PianoBody = styled.div`
  position: absolute;
  left: 200px;
  top: 400px;
  height: 80px;
  width: 1110px;
  border-radius: 3px;
  background-color: ${(props) => (props.primary ? "#6c2506" : "#1C1C1C")};
`;

const Wrapper = styled.div`
  display: flex;
  top: 17px;
  align-items: center;
  justify-content: center;
  position: relative;
`;

/* const Pianosecundary = styled(PianoBody)`
  background-color: #000000;
`; */

const Octave = () => {
  let {
    oscillatorNode,
    volume,
    setKeyPressed,
    setAnalyser,
    setBufferLength,
    setDataArray,
  } = useContext(SoundContext);
  
  let out = audioCtx.destination;
  let vco;
  let synth = [];
  let activeSynths = [];
  let lastSynthsPlayed = [];
  const KEYBOARD_KEYS = [
    "a",
    "w",
    "s",
    "e",
    "d",
    "f",
    "t",
    "g",
    "z",
    "h",
    "u",
    "j",
    "k",
    "o",
    "l",
    "p",
    "ö",
    "ä",
  ];
  let KeyDataIndex = KEYBOARD_KEYS;

  // MOUSE EVENT && PLAY NOTE
  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      const click = e.target.value;
      function playNote() {
        let IndexClick = arrayNotes.findIndex((x) => x.note === click);
        setKeyPressed(IndexClick.toString());
      }
      playNote();
    });
  }, []);

  

// KEY DOWN EVENT && PLAY NOTE FUNCTION
  const creatingNodeKey = (e) => {  
    e.preventDefault();
    //console.log({activeSynths})
    if (e.repeat) return;
  
  
    //MAPPING KEYBOARD KEYS
  const key = e.key;
    let Index = KEYBOARD_KEYS.indexOf(key);
    if (Index === -1) {
    return;
  }
  const keyboardKeysIndex = KeyDataIndex.indexOf(key);
  const noteAudio = document.getElementsByTagName("button");
  const NoteForClass = noteAudio[keyboardKeysIndex];
  let indexMap = Index.toString();
  //console.log(oscillatorNode[indexMap]);

  
  // FILLING ARRAY SYNTH WITH THE OSCILLATOR NODES FOR ALL KEYS
  synth = [];
  oscillatorNode.forEach((item, index) => {
      vco = audioCtx.createOscillator();
      vco.volume = item.vol;
      vco.index = index++;
      vco.type = item.type;
      vco.frequency.value = item.pitchNumber;
      synth.push(vco);
      vco.start()
    });

    // PLAYING  
    //activeSynths.push(synth[indexMap]);
    //activeSynths.splice(3,0,synth[indexMap]);
    activeSynths[indexMap] = synth[indexMap]

    let lastSynthsPlayed = activeSynths[activeSynths.length - 1]
    let indexOfActiveSynths = activeSynths.indexOf(lastSynthsPlayed);
    console.log({indexOfActiveSynths});
    console.log(activeSynths);

    if (lastSynthsPlayed > -1) {
   
      console.log(lastSynthsPlayed["index"]);
    }
    //activeSynths[indexMap].start();

  
    //AMP - MASTER VOLUME CONTROL
    const amp = new GainNode(audioCtx, {gain: synth[indexMap].volume});
    //amp.gain.value = synth[indexMap].volume;
    amp.connect(out);
   
    // CREATING ANALYSER
    const analyser = audioCtx.createAnalyser();
    activeSynths[indexMap].connect(analyser);
    //activeSynths.connect(analyser.indexMap);

    analyser.fftSize = 256;
    /*  console.log({ analyser }); */
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.minDecibels = -90;
    analyser.maxDecibels = 0;
    synth[indexMap].connect(amp);

    //BIQUAD FILTER
    //biquadFilter.connect(gainNode);f
    //convolver.connect(gainNode);

    //Manipulate the Biquad
    /* biquadFilter.type = "lowshelf";
    biquadFilter.frequency.value = 4000;
    biquadFilter.gain.value = 55;
    biquadFilter.detune.value = 100;
     */

    // SENDING REQUEST'S AWAY TO THE VIZUALISER
    setBufferLength(bufferLength);
    setDataArray(dataArray);
    setAnalyser(analyser);

    //BACKGROUND KEYS PIANO
    function playNote() {
      NoteForClass.value.length === 1
        ? NoteForClass.classList.add("activeWhite")
        : NoteForClass.classList.add("activeBlack");
      setKeyPressed(Index.toString());
    }
    if (keyboardKeysIndex > -1 && Index > -1) playNote();
  };


  useEffect(() => {
    
    // KEY DOWN EVENT
    document.addEventListener("keydown", creatingNodeKey);
  
    //KEY UP EVENT && STOP FUNC
    document.addEventListener("keyup", (e) => {
      if (e.repeat) return;
      const key = e.key;
      const keyboardKeysIndex = KeyDataIndex.indexOf(key);
      const noteAudio = document.getElementsByTagName("button");
      const NoteForClass = noteAudio[keyboardKeysIndex];
      let indexMap = keyboardKeysIndex.toString();
      console.log(`keyup index`+` ${indexMap}`)
      if (!NoteForClass && !oscillatorNode) return;
      
          function stopNote() {
            NoteForClass.classList.remove("activeWhite") ||
            NoteForClass.classList.remove("activeBlack");
            console.log(indexMap)           
            activeSynths[indexMap].stop()
            delete activeSynths[indexMap]
              
            synth.forEach((node) => {
              node.stop()  
            }); 

          }
          if (keyboardKeysIndex > -1) stopNote();
        });
  }, []);

  useEffect(() => {
    //console.log({ volume });
  }, [volume]);

  return (
    <div>
      <section>
        <PianoBody>
          <Wrapper>
            <div>
              {arrayNotes.slice(1).map((element) => (
                <Note
                  key={element.note}
                  color={element.color}
                  note={element.note}
                  pitchNumber={element.pitchNumber}
                />
              ))}
            </div>
          </Wrapper>
          <KeyFunctions></KeyFunctions>
        </PianoBody>
      </section>
    </div>
  );
};

export default Octave;
