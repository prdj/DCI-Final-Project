import React from 'react';
import './Style.css'
import styled from 'styled-components';



const Black = styled.button`
  width: 40px;
  height: 130px;
  background: black;
  border: solid black 1px;
  border-radius: 1px;

  position: absolute;
  margin: 1px;
  margin-left: -20px;
  :focus{
    outline: none;
  }
  :active {
    background: #333;
  }
`;

const White = styled.button`
  width: 60px;
  height: 200px;
  background: white;
  border: solid white 2px;
  border-radius: 2px;
  box-shadow: 2px 3px #463f3a;
  margin: 1px;
  margin-left: '-20px';
  box-sizing: border-box;
  :focus{
    outline: none;
  }
  :active {
    background: #CCC;
  }
`;

const Note = ({color, note }) =>
color === 'white' ?(<White value={note}/>) : (<Black value={note}/>);


export default Note;