import React from 'react';
import { arrayNotes } from './Format';
import styled from 'styled-components';
import Note from './Note';
import KeyFunctions from './KeyFunctions';

const PianoBody = styled.div`
  margin: 40vh auto;
  height: 79px;
  width: 1200px;
  border-radius: 5px;
  background-color: ${(props) =>
    props.primary ? '#FFA630' : '#6c2506'};
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
            {arrayNotes.map((element) => (
              <Note
                key={element.note}
                color={element.color}
                note={element.note}
              />
            ))}
          </div>
        </Wrapper>
        <KeyFunctions></KeyFunctions>
      </PianoBody>
    </section>

    <section>
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
    </section>
  </div>
);

export default Octave;
