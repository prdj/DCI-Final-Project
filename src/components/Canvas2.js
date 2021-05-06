import React, { useRef, useEffect, useContext } from "react";
import { SoundContext } from "../context/SoundContext";

import "./Style.css";

const Canvas2 = (props) => {
  let { analyser, dataArray, bufferLength } = useContext(SoundContext);

  const canvasRef = useRef(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const draw = (ctx) => {
    if (!analyser) {
      return;
    }

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // clear canvas
   
    analyser.getByteFrequencyData(dataArray);

    let barWidth = (ctx.canvas.width / bufferLength) * 4.5;
    let barHeight;
    let x = 0;
    let lastRender = Date.now();

    for (let i = 0; i < bufferLength; i++) {
      let delta = Date.now() - lastRender;
      x += delta;
      barWidth += delta;
      barHeight += delta;
      barHeight = dataArray[i];
      ctx.fillStyle = "rgb( " + (barHeight + 200) + ",270,0)";
      ctx.fillRect(
        x,
        ctx.canvas.height - barHeight / 2,
        barWidth / 1.6,
        barHeight
      );
      x += barWidth + 1;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let animationFrameId;
  
    const render = () => {
      draw(context);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return (
   <div >
     
      
    <canvas
      id="myCanvas2"
      style={{
        background: `rgba(255, 230, 255, 0.3)`,
        width: 200,
        height: 180,
        top: 155,
        left: 890,
        border: "3px solid #000",
      }}
      ref={canvasRef}
    />
    <div className="label">
       <h1>FQ/Analyzer</h1>
       </div>
  </div>
  );
};

export default Canvas2;
