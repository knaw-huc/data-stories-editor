import React from 'react';
import logo from './logo.svg';
import './App.css';
import './assets/css/style.css';
import PageHeader from "./pageElements/pageHeader";
import TextBlock from "./pageElements/textBlock";
import YasguiBlock from "./pageElements/yasguiBlock";

function App() {
  return (
      <div>
        <PageHeader/>
        <div className="dsWorkingArea">
            <div className="dsTitle">
                My Data Story
            </div>
<TextBlock/>
           <YasguiBlock/>
        </div>
      </div>
  );
}

export default App;
