import React from "react";
import Octave from "./Octave";
import Volume from "./Volume";
import Canvas from "./Canvas";
import Canvas2 from "./Canvas2";
import useCanvas from "./useCanvas";
import Framer from './Framer';
import RadioButtons from './SynthType';


const Products = (props) => {
  const { draw, ...rest } = props;
  const canvasRef = useCanvas(draw);
  return (
    <div>
      <RadioButtons></RadioButtons>
      <Framer></Framer>
      <Canvas></Canvas>
      <canvas ref={canvasRef} {...rest}
      style={{
        
        width: 200,
        height: 180,
        top: 155,
        left: 680,
        zIndex:0,
        
      }} />
      <Canvas2></Canvas2>
      <Octave></Octave>
      <Volume></Volume>
    </div>
  );
};

export default Products;
