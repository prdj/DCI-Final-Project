import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SoundContext } from "../context/SoundContext";
import { arrayNotes } from "./Format";
import "./Style.css";
import "../scss/App.scss";

import Homepage from "./Homepage";
import Nav from "./Nav";
import Products from "./Products";

// SETTING UP AUDIO CONTEXT API
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const App = () => {
  let {
    value,
    setValue,
    volume,
    sound,
    setKeyPressed,
    setAnalyser,
    setDataArray,
    setBufferLength,
  } = useContext(SoundContext);
  let oscillatorNode = [];
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
  
  
  let WAVE_TYPES = {
    'sine'     : 0,
    'square'   : 1,
    'triangle' : 2,
    'sawtooth' : 3
};
console.log({value})
console.log(Object.keys(WAVE_TYPES)[value]);

const typeType = Object.keys(WAVE_TYPES)[value];


  // MOUSE EVENT && PLAY NOTE

  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      const click = e.target.value;

      function playNote() {
        let IndexClick = arrayNotes.findIndex((x) => x.note === click);
        setKeyPressed(IndexClick.toString());
        console.log(`You pressed: ${IndexClick.toString()}`);
      }

      playNote();
    });

    // KEY DOWN EVENT && PLAY NOTE

    document.addEventListener("keydown", (e) => {
      //const keyboarPcNumberkeys = (e.detail || e.which).toString();
      e.preventDefault();
      if (e.repeat) return;

      //MAPPING KEYS

      const key = e.key;
      let Index = KEYBOARD_KEYS.indexOf(key);
      if (Index === -1) {
        return;
      }

      const keyboardKeysIndex = KeyDataIndex.indexOf(key);

      const noteAudio = document.getElementsByTagName("button");
      const NoteForClass = noteAudio[keyboardKeysIndex];
      let indexMap = Index.toString();
      console.log(oscillatorNode[indexMap]);

      // CREATING THE ARRAY OSCILLATOR NODE

      arrayNotes.forEach((item, index) => {
        let osc = audioCtx.createOscillator();
        osc.frequency.value = item.pitchNumber;
        osc.type = value;
        console.log(value)
        osc.start();
        oscillatorNode.push(osc);
      });

      console.log(oscillatorNode[indexMap].type)

      const gainNode = audioCtx.createGain();
      gainNode.gain.value = volume;

      oscillatorNode[indexMap].connect(gainNode);
      gainNode.connect(audioCtx.destination);

      // CREATING ANALYSER

      const analyser = audioCtx.createAnalyser();
      oscillatorNode[indexMap].connect(analyser);
      analyser.fftSize = 256;

      console.log({ analyser });
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.minDecibels = -90;
      analyser.maxDecibels = 0;

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
        console.log(`You pressed: ${Index.toString()}`);
      }

      if (keyboardKeysIndex > -1 && Index > -1) playNote();
    });

    //KEY UP EVENT && STOP FUNC

    document.addEventListener("keyup", (e) => {
      if (e.repeat) return;
      const key = e.key;
      const keyboardKeysIndex = KeyDataIndex.indexOf(key);

      const noteAudio = document.getElementsByTagName("button");
      const NoteForClass = noteAudio[keyboardKeysIndex];
      let indexMap = keyboardKeysIndex.toString();
      if (!NoteForClass && !oscillatorNode) return;

      function stopNote() {
        NoteForClass.classList.remove("activeWhite") ||
          NoteForClass.classList.remove("activeBlack");
        oscillatorNode[indexMap].disconnect();
      }

      if (keyboardKeysIndex > -1) stopNote();
    });
  }, []);

  useEffect(() => {
  
    console.log({ sound });
    console.log({ value });
  }, [sound, value]);

  return (
    <div className="App">
      <Router>
        {/* <Nav></Nav> */}
        <div className="main">
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/products" component={Products} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
