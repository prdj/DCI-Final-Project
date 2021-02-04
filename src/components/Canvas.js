import React, { useRef, useEffect, useContext } from "react";
import { SoundContext } from "../context/SoundContext";
import "./Style.css";

const Canvas = (props) => {
  let { analyser, dataArray, bufferLength } = useContext(SoundContext);

  const canvasRef = useRef(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const draw = (ctx) => {
    if (!analyser) {
      return;
    }

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // clear canvas

    analyser.getByteFrequencyData(dataArray);

    ctx.fillStyle = "rgba(0, 255, 0, 0.8)";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.lineWidth = 6;
    ctx.strokeStyle = "rgb(0, 0, 0)";

    ctx.beginPath();

    var sliceWidth = (ctx.canvas.width * 1.0) / bufferLength;
    var x = 0;

    for (var i = 0; i < bufferLength; i++) {
      var v = dataArray[i] * 200.0;
      var y = ctx.canvas.height / 2 + v;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    ctx.lineTo(ctx.width, ctx.height / 2);
    ctx.stroke();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let animationFrameId;

    //Our draw came here
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
    <div>
    <canvas
      id="myCanvas1"
      
      style={{ 
        background: `rgba(0, 255, 0, 0.8)`,
        width:175,
        height:60,
        position:"absolute",
        top:218,
        left:545,
        border:'3px solid #000',
        transform: 'rotate(90deg)',
        
      }}
      ref={canvasRef}
    />
    <div className="label1">oscillos..</div>
    </div>
  );
};

export default Canvas;
