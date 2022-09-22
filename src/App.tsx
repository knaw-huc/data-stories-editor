import React from 'react';
import './assets/css/dstore-style.css';
import IneoPageHeader from "./pageElements/ineoPageHeader";
import DsStoryBlockRoll from "./pageElements/dsStoryBlockRoll";
import DsEditor from "./pageElements/dsEditor";


function App() {
  return (
      <div>
      <IneoPageHeader />
      <DsStoryBlockRoll />

      <DsEditor />

      </div>
  );
}

export default App;
