import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Dataprovider } from './Components/Dataprovider/Dataprovider';
import {initialState,reducer} from'./utility/reducer'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Dataprovider reducer={reducer} initialstate={initialState}>
        <App />
    </Dataprovider>
    
  
  </React.StrictMode>
);



