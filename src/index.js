import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {BrowserRouter as Router} from 'react-router-dom';
import {configureStore} from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import {reducer} from './reducer';
const store=configureStore({
  reducer,
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
       <App />
       </Provider>
    </Router>
  </React.StrictMode>
);