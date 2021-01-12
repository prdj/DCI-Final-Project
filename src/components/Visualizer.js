import React, { useRef, useEffect, useContext } from "react";
import "./globals";
import "p5/lib/addons/p5.sound";
import p5 from "p5";
import "../scss/App.scss";
import "./style.css";
import { SoundContext } from "../context/SoundContext";

const Visualizer = () => {
  const myRef = useRef(null);

  const { sound, volume, keyPressed, setSound, setVolume } = useContext(
    SoundContext
  );

  const Sketch = (p) => {
    let music = volume;
    let freqmusic = sound;
    let bands = 1024;
    let fft, canvas, song, dimension, w;
    let selectedPalette = 0;
    let NUM_PALETTES = 4;
    let colorPalettes = [
      [
        p.color("#F94144"),
        p.color("#F3722C"),
        p.color("#F8961E"),
        p.color("#F9C74F"),
        p.color("#90BE6D"),
        p.color("#43AA8B"),
        p.color("#577590"),
      ],
      [
        p.color("#577590"),
        p.color("#43AA8B"),
        p.color("#90BE6D"),
        p.color("#F9C74F"),
        p.color("#F8961E"),
        p.color("#F3722C"),
        p.color("#F94144"),
      ],
      [
        p.color("#D7D9B1"),
        p.color("#84ACCE"),
        p.color("#827191"),
        p.color("#7D1D3F"),
        p.color("#512500"),
        p.color("#092327"),
        p.color("#0B5351"),
      ],
      [
        p.color("#0B5351"),
        p.color("#092327"),
        p.color("#512500"),
        p.color("#7D1D3F"),
        p.color("#827191"),
        p.color("#84ACCE"),
        p.color("#D7D9B1"),
      ],
    ];
    // Loads the music file into p5.js to play on click
    p.preload = () => {
      p.soundFormats("mp3");
      /* song = p.loadSound(); */
    };
    // Initial setup to create canvas and audio analyzers
    p.setup = () => {
      dimension = p.min(p.windowWidth, p.windowHeight);
      canvas = p.createCanvas(dimension / 2, dimension / 2);
      canvas.mouseClicked(p.handleClick);
      fft = new p5.FFT(0.93, bands);
      w = p.windowWidth / 128;
    };

    p.draw = () => {
      p.background(100);
      let spectrum = fft.analyze();
      let sizes = fft.linAverages(20);
      for (let i = 0; i < spectrum.length; i++) {
        let amp = spectrum[i];
        let y = p.map(amp, 0, 280, p.windowHeight / 2.8, 0);
        p.rect(i * w, y, w - 2, p.windowHeight - y);
        /* sizes[i] = p.map(sizes[i], 0, 255, 5.0, 23)    // scales the FFT values to a good size range
          p.rect(i * w, sizes[i], w, p.windowHeight - sizes[i]) */
      }
      p.stroke(20);
      p.fill(colorPalettes[selectedPalette][1]);
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
        selectedPalette = (selectedPalette + 1) % NUM_PALETTES;
      }
      return false; // prevent default
    };
  };

  console.log("VISJS RERENDERING...");
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


    let howlObject = sound._sprite;
    console.log(howlObject);

  
 
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

// class Visualizer extends Component {
//   static contextType = SoundContext;
//   constructor() {
//     super();
//     this.myRef = React.createRef();
//   }

//   // React things to make p5.js work properly and not lag when leaving the current page below
//   componentDidMount() {
//     this.myP5 = new p5(this.Sketch, this.myRef.current);
//     let context = this.context;
//     this.setState({ volume: context.volume });
//     this.setState({ sound: context.sound });
//     console.log(context.volume);
//   }

//   /*    componentDidUpdate() {
//     this.myP5.remove();
//     this.myP5 = new p5(this.Sketch, this.myRef.current);
//   }
//  */
//   /*  componentWillUnmount() {
//     this.myP5.remove();
//   } */

//

//   render() {
//     return (
//       <div>
//         <header>Sound Visualizer</header>
//         <div ref={this.myRef}></div>
//       </div>
//     );
//   }
// }

// export default Visualizer;
