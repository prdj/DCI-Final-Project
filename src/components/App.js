import React, {
  useEffect,
  useContext,
  useState,
} from 'react';
import { Howl, Howler } from 'howler';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { SoundContext } from '../context/SoundContext';

import { arrayNotes } from './Format';
import './style.css';
import '../scss/App.scss';

import Homepage from './Homepage';
import Nav from './Nav';
import Products from './Products';

const App = () => {
  let {
    volume,
    setVolume,
    sound,
    setSound,
    keyPressed,
    setKeyPressed,
  } = useContext(SoundContext);

  console.log(keyPressed);

  const KEYBOARD_KEYS = [
    'a',
    'w',
    's',
    'e',
    'd',
    'f',
    't',
    'g',
    'z',
    'h',
    'u',
    'j',
    'k',
    'o',
    'l',
    'p',
    'ö',
    'ä',
  ];

  let KeyDataIndex = KEYBOARD_KEYS;

  useEffect(() => {
    Howler.volume(volume);
  }, [volume]);

  useEffect(() => {
    let sound = new Howl({
      src: ['./Piano01/piano-02.mp3'],
      onload() {
        console.log('Sound file has been loaded.');
        soundEngine();
      },
      onloaderror(e, msg) {
        console.log('Error', e, msg);
      },
    });

    const soundEngine = function () {
      const lengthNote = 4000;
      let timeIndex = 0;
      
      console.log(keyPressed)
      for (let i = 0; i <= 96; i++) {
        sound['_sprite'][i] = [timeIndex, lengthNote];
        timeIndex += lengthNote;
        setSound(sound);
        sound.play('')
       
       
      };
    
    };
    
 
    document.addEventListener('mousedown', (e) => {
      const click = e.target.value;

      function playNote() {
        let howlerIndexClick = arrayNotes.findIndex(
          (x) => x.note === click
        );
          console.log(howlerIndexClick);

        sound.play(howlerIndexClick.toString());
        setKeyPressed(howlerIndexClick.toString());
        console.log(
          `You pressed: ${howlerIndexClick.toString()}`
        );
      }
      playNote();
    });

    document.addEventListener('keydown', (e) => {
      e.preventDefault();
      /*   console.log(e) */
      if (e.repeat) return;

      //Mapping keyboard
      const key = e.key;

      // doing these below I give the pressed keyboard key the same index of the object audio key
      let howlerIndex = KEYBOARD_KEYS.indexOf(key);
      /* howlerIndex += 29; */
      const keyboardKeysIndex = KeyDataIndex.indexOf(key);
      /* console.log(keyboardKeysIndex); */
      console.log(howlerIndex);

      const noteAudio = document.getElementsByTagName(
        'button'
      );
      const NoteForClass = noteAudio[keyboardKeysIndex];
         
      function playNote() {
        NoteForClass.value.length === 1
          ? NoteForClass.classList.add('activeWhite')
          : NoteForClass.classList.add('activeBlack');

        sound.play(howlerIndex.toString());
        setKeyPressed(howlerIndex.toString());
        console.log(
          `You pressed: ${howlerIndex.toString()}`
        );
        
      }
      if (keyboardKeysIndex > -1) playNote();
    });

    document.addEventListener('keyup', (e) => {
      if (e.repeat) return;

      const key = e.key;

      const keyboardKeysIndex = KeyDataIndex.indexOf(key);

      const noteAudio = document.getElementsByTagName(
        'button'
      );
      const NoteForClass = noteAudio[keyboardKeysIndex];

      if (!NoteForClass) return;

      function stopNote() {
        NoteForClass.classList.remove('activeWhite') || NoteForClass.classList.remove('activeBlack');
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
            <Route
              exact
              path="/products"
              component={Products}
            />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
