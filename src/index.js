import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from './context/context';
import { SpeechProvider } from '@speechly/react-client';
import './index.css';

ReactDOM.render(
  <SpeechProvider appId='46ff9772-8f7c-4b8e-87fd-33bb22747edc' language='en-US'>
    <Provider>
      <App />
    </Provider>
  </SpeechProvider>,
  document.getElementById('root')
);
