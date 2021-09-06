import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";

const Next = styled.button`
  width: 30px;
  height: 20px;
  top: -48px;
  left: 20px;
  background: #f3c54c;
  border: dashed #5c6f6f 7px;
  border-radius: 2px;
  position: relative;
  box-sizing: border-box;
  :focus {
    outline: none;
  }
  :active {
    background: #1c1c1c;
  }
`;

const Previous = styled.button`
  width: 30px;
  height: 21px;
  left: 10px;
  top: -48px;
  background: #f3c54c;
  border: dashed #5c6f6f 8px;
  border-radius: 2px;
  position: relative;
  box-sizing: border-box;
  :focus {
    outline: none;
  }
  :active {
    background: #1c1c1c;
  }
`;

function KeyFunction() {
  const test = {
    octavePosition: [88, 214, 340, 463, 589, 715, 841, 967],
    boxSize: [200, 200, 200, 200, 200, 200, 200, 146],
  };

  const [counter, setCounter] = useState(2);
  /*   console.log(count); */
  const [position, setPosition] = useState(340);
  /* console.log(position); */
  const [boxSize, setboxSize] = useState(200);
  /*  console.log(boxSize); */

  const handleUserKeyPress = useCallback(
    (event) => {
      const { keyCode } = event;

      if (keyCode === 37) {
        return decrementOctave();
      }

      if (keyCode === 39) {
        return incrementOctave();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps

    },
    [counter]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);

    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  const decrementOctave = () => {
    if (counter <= 1) {
      setCounter(0);
      setPosition(test.octavePosition[0]);
      setboxSize(test.boxSize[0]);
    } else if (counter) {
      setCounter(counter - 1);
      setPosition(test.octavePosition[counter - 1]);
      setboxSize(test.boxSize[counter - 1]);
    }
  };

  const incrementOctave = () => {
    if (counter > 7) {
      console.log("the end");
      setCounter(counter);
      setPosition(test.octavePosition[counter]);
      setboxSize(test.boxSize[counter]);
    } else if (counter < 7) {
      setCounter(counter + 1);
      setPosition(test.octavePosition[counter + 1]);
      setboxSize(test.boxSize[counter + 1]);
    }
  };

  const KeysOn = styled.div`
    pointer-events: none;
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
