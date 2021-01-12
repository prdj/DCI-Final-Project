import React, {
  useRef,
  useEffect,
  useContext,
} from 'react';
import './globals';
import 'p5/lib/addons/p5.sound';
import p5 from 'p5';
import '../scss/App.scss';
import './Style.css';
import { SoundContext } from '../context/SoundContext';
import { Howl, Howler } from 'howler';

const Visualizer = () => {
  const myRef = useRef(null);

  const {
    sound,
    volume,
    keyPressed,
    setSound,
    setVolume,
  } = useContext(SoundContext);

  const Sketch = (p) => {
    let bands = 256;
    let fft, canvas, song, dimension, w;
    let selectedPalette = 0;
    let NUM_PALETTES = 4;
    let colorPalettes = [
      [
        p.color('#F94144'),
        p.color('#F3722C'),
        p.color('#F8961E'),
        p.color('#F9C74F'),
        p.color('#90BE6D'),
        p.color('#43AA8B'),
        p.color('#577590'),
      ],
      [
        p.color('#577590'),
        p.color('#43AA8B'),
        p.color('#90BE6D'),
        p.color('#F9C74F'),
        p.color('#F8961E'),
        p.color('#F3722C'),
        p.color('#F94144'),
      ],
      [
        p.color('#D7D9B1'),
        p.color('#84ACCE'),
        p.color('#827191'),
        p.color('#7D1D3F'),
        p.color('#512500'),
        p.color('#092327'),
        p.color('#0B5351'),
      ],
      [
        p.color('#0B5351'),
        p.color('#092327'),
        p.color('#512500'),
        p.color('#7D1D3F'),
        p.color('#827191'),
        p.color('#84ACCE'),
        p.color('#D7D9B1'),
      ],
    ];

    // Initial setup to create canvas and audio analyzers
    p.setup = () => {
      dimension = p.min(p.windowWidth, p.windowHeight);
      canvas = p.createCanvas(p.windowWidth, 200);
      // canvas.mouseClicked(p.handleClick);
      // fft = new p5.FFT(0.93, bands);
      // w = p.windowWidth / 128;
    };

    p.draw = () => {
      p.background(100);

      // let spectrum = fft.analyze();
      // let sizes = fft.linAverages(20);
      if (sound.length) {
        console.log(sound);
        for (let i = 0; i < 128; i++) {
          let height = sound[i] / 2;
          let w = 10;
          let y = i * w + 2;
          p.rect(0, 190, 10, 10);
          /* sizes[i] = p.map(sizes[i], 0, 255, 5.0, 23)    // scales the FFT values to a good size range
          p.rect(i * w, sizes[i], w, p.windowHeight - sizes[i]) */
        }
        p.stroke(20);
        p.fill('red');
      }
    };

    // Toggles song on click
    p.handleClick = () => {
      if (song.isPlaying()) {
        if (song) {
          song.pause();
        }
      } else {
        song.play();
      }
    };

    // Cycles color palette on Space Bar press
    p.keyPressed = () => {
      if (p.keyCode === 32) {
        // 32 is the keycode for SPACE_BAR
        selectedPalette =
          (selectedPalette + 1) % NUM_PALETTES;
      }
      return false; // prevent default
    };
  };

  console.log('VISJS RERENDERING...');
  let myP5;

  useEffect(() => {
    // component did mount
    myP5 = new p5(Sketch, myRef.current);
  }, []);

  useEffect(() => {
    console.log(`VOLUME  FROM VIS.JS:`, volume);
    console.log(`SOUND  FROM VIS.JS:`, sound);
    console.log(`KEY PRESSED  FROM VIS.JS:`, keyPressed);
  }, [volume, sound, keyPressed]);

  useEffect(() => {
    return () => {
      myP5.remove();
    };
  }, []);

  return (
    <div>
      <header>Sound Visualizer</header>
      <div ref={myRef}></div>
    </div>
  );
};

export default Visualizer;
