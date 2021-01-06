import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";

const Next = styled.button`
  width: 30px;
  height: 20px;
  top: -48px;
  left: 20px;
  background: yellow;
  border: dashed red 7px;
  border-radius: 2px;
  position: relative;
  box-sizing: border-box;
  :focus {
    outline: none;
  }
  :active {
    background: black;
  }
`;

const Previous = styled.button`
  width: 30px;
  height: 21px;
  left: 10px;
  top: -48px;
  background: yellow;
  border: dashed red 8px;
  border-radius: 2px;
  position: relative;
  box-sizing: border-box;
  :focus {
    outline: none;
  }
  :active {
    background: black;
  }
`;

function KeyFunction() {
  const test = {
    octavePosition: [88, 214, 340, 463, 589, 715, 841, 967],
    boxSize: [200, 200, 200, 200, 200, 200, 200, 146],
  };

  const [count, setCount] = useState(2);
/*   console.log(count); */
  const [position, setPosition] = useState(340);
  /* console.log(position); */
  const [boxSize, setboxSize] = useState(200);
 /*  console.log(boxSize); */

  const handleUserKeyPress = useCallback((event) => {
    const {keyCode} = event;

    console.log(event);

    if (keyCode === 37) {
      return decrementOctave()
    } 

    if (keyCode === 39) {
      return incrementOctave()
    } 
    
  }, [count]);

  useEffect(() => {
    window.addEventListener("keypress", handleUserKeyPress);

    return () => {
      window.removeEventListener("keypress", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  const decrementOctave = () => {
    if (count <= 1) {
      setCount(0);
      setPosition(test.octavePosition[0]);
      setboxSize(test.boxSize[0]);
    } else if (count) {
      setCount(count - 1);
      setPosition(test.octavePosition[count - 1]);
      setboxSize(test.boxSize[count - 1]);
    }
  };

  const incrementOctave = () => {
    if (count > 7) {
      console.log("the end");
      setCount(count);
      setPosition(test.octavePosition[count]);
      setboxSize(test.boxSize[count]);
    } else if (count < 7) {
      setCount(count + 1);
      setPosition(test.octavePosition[count + 1]);
      setboxSize(test.boxSize[count + 1]);
    }
  };

  const KeysOn = styled.div`
    border: 3px solid blue;
    width: ${boxSize}px;
    height: 65px;
    position: relative;
    top: -71px;
    left: ${position}px;
    z-index: 1;
  `;

  return (
    <div>
      <Previous type="button" onClick={decrementOctave} />

      <Next type="button" onClick={incrementOctave} />

      <KeysOn className="slider" />
    </div>
  );
}

export default KeyFunction;
