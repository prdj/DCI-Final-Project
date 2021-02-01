import React from 'react';
import { arrayNotes } from './Format';
import styled from 'styled-components';
import Note from './Note';
import KeyFunctions from './KeyFunctions';

const PianoBody = styled.div`
  position: absolute;
  left:200px;
  top:400px;
  height: 80px;
  width: 1110px;
  border-radius: 3px;
  background-color: ${(props) =>
    props.primary ? '#6c2506' : '#1C1C1C'};
`;

const Wrapper = styled.div`
  display: flex;
  top: 17px;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Pianosecundary = styled(PianoBody)`
  background-color: #000000;
`;

const Octave = () => (
  <div>
    <section>
      <PianoBody>
        <Wrapper>
          <div>
            {arrayNotes.slice(1).map((element) => (
              <Note
                key={element.note}
                color={element.color}
                note={element.note}
                pitchNumber={element.pitchNumber}
              />
            ))}
          </div>
        </Wrapper>
        <KeyFunctions></KeyFunctions>
      </PianoBody>
    </section>

{/*     <section>
      <PianoBody primary>
        <Wrapper>
          <div>
            {arrayNotes.map((element) => (
              <Note
                key={element.note}
                color={element.color}
                note={element.note}
              />
            ))}
          </div>
        </Wrapper>
      </PianoBody>
    </section>

    <section>
      <Pianosecundary>
        <Wrapper>
          <div>
            {arrayNotes.map((element) => (
              <Note
                key={element.note}
                color={element.color}
                note={element.note}
              />
            ))}
          </div>
        </Wrapper>
      </Pianosecundary>
    </section> */}
  </div>
);

export default Octave;
