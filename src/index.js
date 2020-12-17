import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import SoundProvider from './context/SoundContext'


ReactDOM.render(
  <SoundProvider>
    <App />
  </SoundProvider>,
  document.getElementById('root')
);

