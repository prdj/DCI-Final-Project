import React from 'react';
import {arrayNotes} from './Format';
import styled from 'styled-components'
import Note from './Note';

const PianoBody = styled.div`
      
    margin: 20vh auto;
    height:265px;
    width: 1190px;
    border-radius: 5px;
    background-color: ${props => props.primary ? "#FFA630" : "#6c2506"};
    `;
    
    const Wrapper = styled.div`
    display:flex;
    align-self: auto | flex-start | flex-end | center | baseline | stretch;
    }
   
    width: 1200px; 
    align-items: center;
    justify-content:center;
    height:50vh;
    position: relative;
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




