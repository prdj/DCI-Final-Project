import { arrayNotes } from "./Format";
import styled from "styled-components";
import Note from "./Note";
import KeyFunctions from "./KeyFunctions";

import React, { useEffect, useContext } from "react";
import { SoundContext } from "../context/SoundContext";

// SETTING UP AUDIO CONTEXT API
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// CREATING THE PIANO
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
    sound,
    volume,
    setKeyPressed,
    setAnalyser,
    setBufferLength,
    setDataArray,
  } = useContext(SoundContext);
  

  let osc
  let synth = [];

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

  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      const click = e.target.value;

      function playNote() {
        let IndexClick = arrayNotes.findIndex((x) => x.note === click);
        setKeyPressed(IndexClick.toString());
/*         console.log(`You pressed: ${IndexClick.toString()}`);
 */      }

      playNote();
    });
  }, []);

  const cretingNodeKey = (e) => {
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

    oscillatorNode.forEach((item,index) => {
      osc = audioCtx.createOscillator()
      osc.type= oscillatorNode[indexMap].type
      osc.frequency.value = item.pitchNumber;
      console.log(osc.frequency.value)
      osc.start()
      synth.push(osc)
    });

    console.log(synth[indexMap])

    const gainNode = audioCtx.createGain();
    /* console.log({volume}) */
    gainNode.gain.value = volume;

    synth[indexMap].connect(gainNode);
    gainNode.connect(audioCtx.destination);

    // CREATING ANALYSER

    const analyser = audioCtx.createAnalyser();
    synth[indexMap].connect(analyser);
    analyser.fftSize = 256;

   /*  console.log({ analyser }); */
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
      /* console.log(`You pressed: ${Index.toString()}`); */
    }

    if (keyboardKeysIndex > -1 && Index > -1) playNote();
  };

  // MOUSE EVENT && PLAY NOTE

  useEffect(() => {
    // KEY DOWN EVENT && PLAY NOTE

    document.addEventListener("keydown", cretingNodeKey);

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
          setTimeout(() => {
            synth[indexMap].disconnect();
          }, 100);
        
      }

      if (keyboardKeysIndex > -1) stopNote();
    });
  }, []);


  useEffect(() => {
    
   /*  console.log({ volume });
    console.log({ value }); */
  }, [sound, volume]);

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

      {/*     <section>
      <PianoBody primary>
        <Wrapper>
          <div>
            {arrayNotes.map((element) => (
              <Note
                key={element.note}
                color={element.color}
                note={element.note}
              />
            ))}
          </div>
        </Wrapper>
      </PianoBody>
    </section>

    <section>
      <Pianosecundary>
        <Wrapper>
          <div>
            {arrayNotes.map((element) => (
              <Note
                key={element.note}
                color={element.color}
                note={element.note}
              />
            ))}
          </div>
        </Wrapper>
      </Pianosecundary>
    </section> */}
    </div>
  );
};

export default Octave;
