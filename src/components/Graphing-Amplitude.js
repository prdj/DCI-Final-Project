import React, { useContext } from "react";
import Sketch from "react-p5";
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
  let { volume, setVolume } = useContext(SoundContext);
  let y = 8;
  let direction = '^';

  /* console.log(volume)
 */
  



  return (
    <Graphics>
      <h1>FQ/ANALIZER</h1>
      <Sketch
      preload={(p5)=>{
      }
      }
        setup={(p5, parentRef) => {
          p5.createCanvas(300, 151).parent(parentRef);
          p5.amplitude()
        }}

        draw={(p5) => {
          p5.background(163);
          p5.fill(255, y * 7, 9);
          p5.ellipse(p5.width / 4, y, 150);
          /* if (y > p5.height) direction = "";
          if (y < 0) {
            direction = "^";
          }
          if (direction === "^") y += 8;
          else y -= 4; */
        }}
      />
    </Graphics>
  );
};

export default GraphingAmplitude;
