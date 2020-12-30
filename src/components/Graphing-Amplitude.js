import React, { useContext } from "react";
import Sketch from "react-p5";
import p5 from "p5";
import styled from "styled-components";
import { SoundContext } from "../context/SoundContext";

const Graphics = styled.div`
  background: white;
  border-radius: 4px;
  width: 300px;
  height: 200px;
  position: relative;
  top: 390px;
  margin: auto;
  z-index: 1;
`;

const GraphingAmplitude = () => {
  let { sound, setSound } = useContext(SoundContext);
  let amp;
  let y = 0;
  let direction = "^";

  function preload() { // @preload is required by P5.js
    p5.soundFormats('mp3', 'ogg');
    amp = p5.loadSound(sound);
}

  return (
    <Graphics>
      <h1>FQ/ANALIZER</h1>
      <Sketch
        setup={(p5, parentRef) => {
          p5.createCanvas(300, 151).parent(parentRef);
         
        }}
        draw={(p5) => {
          p5.background(0);
          p5.fill(255, y * 1.3, 0);
          p5.ellipse(p5.width / 2, y, 50);
          if (y > p5.height) direction = "";
          if (y < 0) {
            direction = "^";
          }
          if (direction === "^") y += 8;
          else y -= 4;
        }}
      />
    </Graphics>
  );
};

export default GraphingAmplitude;
