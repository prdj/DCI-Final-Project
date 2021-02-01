import { useRef, useEffect } from 'react'

const useCanvas = props => {
  
  const canvasRef = useRef(null)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const draw = (ctx, canvas) => {
    
    
    ctx.strokeStyle = 'white';
    var w = canvas.width;
    var h = canvas.height;
    
    for (var i = 1; i < 10; i++) {
        ctx.beginPath();
        ctx.moveTo(0, h/10*i);
        ctx.lineTo(w, h/10*i);
        ctx.stroke();
    }
    
    for (var i = 1; i < 8; i++) {
        ctx.beginPath();
        ctx.moveTo(w/8*i, 0);
        ctx.lineTo(w/8*i, h);
        ctx.stroke();
    }
    
    ctx.restore();
};

  
  useEffect(() => {
    
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    let frameCount = 0
    let animationFrameId
    
    const render = () => {
      frameCount++
      draw(context, canvas)
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()
    
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])
  
  return canvasRef
}

export default useCanvas