import React from 'react';
import {arrayNotes} from './Format';
import styled from 'styled-components'
import Note from './Note';


const PianoBody = styled.div`
    display: flex; 
    margin: 40vh 10vw;
    height: 10vh;
    width: 80vw;
    border-radius: 5px;
    background-color: ${props => props.primary ? "#FFA630" : "#6c2506"};
    `;
    
    const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    border:2px solid black;
    position:relative;
    `;

    const Pianosecundary = styled(PianoBody)`
    background-color: #000000 `;


const Octave = ()=> (
<div>
   <section>
   <PianoBody>
   <Wrapper>
   <div>
       {arrayNotes.map((element)=>(
           <Note key={element.note} color={element.color} note={element.note}/>
       ))}
   </div>
   </Wrapper>
   </PianoBody>
   </section>
  
   <section>
   <PianoBody primary>
   <Wrapper>
   <div>
       {arrayNotes.map((element)=>(
           <Note key={element.note} color={element.color} note={element.note}/>
       ))}
   </div>
   </Wrapper>
   </PianoBody>
   </section> 

   <section>
   <Pianosecundary>
   <Wrapper>
   <div>
       {arrayNotes.map((element)=>(
           <Note key={element.note} color={element.color} note={element.note}/>
       ))}
   </div>
   </Wrapper>
   </Pianosecundary>
   </section>

</div>
);

export default Octave;




