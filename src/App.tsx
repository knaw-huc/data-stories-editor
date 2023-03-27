import React from 'react';
import './assets/css/dstore-style.css';
import IneoPageHeader from "./pageElements/ineoPageHeader";
import DsStory from "./pageElements/dsStory";
import {Outlet} from "react-router-dom";


export default function App() {


  return (
      <div>
      <IneoPageHeader />
      <DsStory />
      </div>
  );
}
