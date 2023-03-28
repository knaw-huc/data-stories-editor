import React from 'react';
import './assets/css/dstore-style.css';
import './assets/css/style.css';
import IneoPageHeader from "./pageElements/ineoPageHeader";
import {Outlet} from "react-router-dom";


export default function App() {


  return (
      <div>
      <IneoPageHeader />
      <Outlet />
      </div>
  );
}
