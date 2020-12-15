import React, { useState } from 'react';
import styled from 'styled-components';


const Next = styled.button`
  width: 30px;
  height: 20px;
  top:-48px;
  left:20px;
  background: yellow;
  border: dashed red 7px;  
  border-radius: 2px;
  position:relative;
  box-sizing: border-box;
  :focus{
    outline: none;
  }
  :active {
    background: black;
  }
  `;
  
  const Previous = styled.button`
  width: 30px;
  height: 21px;
  left:10px;
  top:-48px;
  background: yellow;
  border: dashed red 8px;
  border-radius: 2px;
  position: relative;
  box-sizing: border-box;
  :focus{
    outline: none;
  }
  :active {
    background: black;
  }
  `;


function KeyFunction () {

  const test = {
    octavePosition: [88,214,340,463,589,715,841,967],
    boxSize: [200,200,200,200,200,200,200,100,100]
  }


   const [count, setCount] = useState(1);
   console.log(count)
   const [position, setPosition] = useState(88);
   console.log(position)
   const [boxSize, setboxSize]= useState(200)
   console.log(boxSize)

 
  
  const decrementOctave = () => {
    if (count <= 1){
        setCount(0)
        setPosition(test.octavePosition[0]);
        setboxSize(test.boxSize[0])
    } else {
        setCount(count - 1)
        setPosition(test.octavePosition[count -1]);
        setboxSize(test.boxSize[count -1])
    }
    
  
  } 
  const incrementOctave = () => {
  
    if (count > 6){ 
      console.log('I riched the end')
            setCount(count)
            setPosition(test.octavePosition[count]);
            setboxSize(test.boxSize[count])
    } else {
          setCount(count + 1)
            setPosition(test.octavePosition[count]);
            setboxSize(test.boxSize[count])
       
    }

  } 


  const KeysOn = styled.div`
  border: 3px solid blue;
  width:${boxSize}px;
  height:65px;
  position:relative; 
  top:-69px; 
  left:${position}px;
  z-index:10;
  `;
 
  


    return(
        
        <div>
            <Previous type="button" onClick={decrementOctave}/>
            
            <Next type="button"  onClick={incrementOctave}/>
           
            <KeysOn  className='slider'/>
        </div>
        
           
    );
}

export default KeyFunction;