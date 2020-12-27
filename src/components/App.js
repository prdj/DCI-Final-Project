import React, { useEffect, useContext, useState } from "react";
import { Howl, Howler } from "howler";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SoundContext } from "../context/SoundContext";

import { arrayNotes } from "./Format";
import "./Style.css";
import "../scss/App.scss";

import Homepage from "./Homepage";
import Nav from "./Nav";
import Products from "./Products";

function App() {
  let { volume, setVolume } = useContext(SoundContext);
  let [sound, setSound] = useState();

  console.log({ volume });

  /* let KeyDataIndex = Object.keys(KeyData); */
  /* let audio */

  const KEYBOARD_KEYS = [
    "a",
    "w",
    "s",
    "e",
    "d",
    "r",
    "f",
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

  useEffect(() => {
    Howler.volume(volume);
  }, [volume]);

  useEffect(() => {
    
    let sound = new Howl({
      src: ["./Piano01/piano-02.mp3"],
      onload() {
        console.log("Sound file has been loaded.");
        soundEngine();
      },
      onloaderror(e, msg) {
        console.log("Error", e, msg);
      },
    });
    setSound(sound);


    const soundEngine = function () {
      const lengthNote = 4000;
      let timeIndex = 0;
      for (let i = 0; i <= 96; i++) {
        sound["_sprite"][i] = [timeIndex, lengthNote];
        timeIndex += lengthNote;
      }
      sound.play("");
    };

    document.addEventListener("mousedown", (e) => {
      const click = e.target.value;
      console.log(click);

      function playNote() {
        let howlerIndexClick = arrayNotes.findIndex((x) => x.note === click);
        /* howlerIndexClick += 29; */
        console.log(howlerIndexClick);

        sound.play(howlerIndexClick.toString());

        /* const audio = new Audio(`hohner_keys/piano_${click}.wav`);
      console.log(audio)
      audio.currentTime=0
      audio.play().catch(() => void 0);  */
      }
      playNote();
    });

    document.addEventListener("keydown", (e) => {
      e.preventDefault();
      /*   console.log(e) */
      if (e.repeat) return;

      //Mapping keyboard
      const key = e.key;

      // doing these below I give the pressed keyboard key the same index of the object audio key
      let howlerIndex = KEYBOARD_KEYS.indexOf(key);
      /* howlerIndex += 29; */
      const keyboardKeysIndex = KeyDataIndex.indexOf(key);
      console.log(keyboardKeysIndex);
      console.log(howlerIndex);

      /* const finito = KeyData[keyboardKeysIndex].audio.play(); */
      const noteAudio = document.getElementsByTagName("button");
      const NoteForClass = noteAudio[keyboardKeysIndex];
      /*  console.log(NoteForClass); */

      function playNote() {
        NoteForClass.value.length === 1
          ? NoteForClass.classList.add("activeWhite")
          : NoteForClass.classList.add("activeBlack");
        //KeyData[key].audio.play()
        sound.play(howlerIndex.toString());

        /* audio = new Audio(`hohner_keys/piano_${finito.note}.wav`);
      console.log(audio)
      audio.currentTime=0.1;
      audio.volume= 0.3;
      e.preventDefault();
      audio.play().catch(() => void 0); */
      }
      if (keyboardKeysIndex > -1) playNote();
    });

    document.addEventListener("keyup", (e) => {
      if (e.repeat) return;
      //Mapping keyboard
      const key = e.key;
      /*  console.log(key) */
      const keyboardKeysIndex = KeyDataIndex.indexOf(key);
      /* const finito = arrayNotes[keyboardKeysIndex] */

      const noteAudio = document.getElementsByTagName("button");
      const NoteForClass = noteAudio[keyboardKeysIndex];
      /*  console.log(NoteForClass); */

      if (!NoteForClass) return;

      function stopNote() {
        NoteForClass.classList.remove("activeWhite") ||
          NoteForClass.classList.remove("activeBlack");
        //KeyData[key].audio.pause()
        /*  console.log(audio)
        audio.pause();
        audio.currentTime=0; */
        sound.stop();
      }

      if (keyboardKeysIndex > -1) stopNote();
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <Nav></Nav>
        <div className="main">
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/products" component={Products} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
