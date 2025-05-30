import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Story from "./pageElements/dsStory";
import BrowserHome from "./browser/browserHome";
import StorySettings from "./storySettings/storySettings";
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
      <Routes>
          <Route path="/" element={<App/>}>
              <Route index element={<BrowserHome/>}/>
              <Route path="story" element={<Story/>}>
                  <Route path=":status/:store" element={<Story/>}/>
              </Route>
              <Route path="settings" element={<StorySettings/>}>
                  <Route path=":store" element={<StorySettings/>}/>
              </Route>
          </Route>
      </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
