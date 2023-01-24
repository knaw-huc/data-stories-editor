import React from 'react';
import logo from '../assets/img/logo_clariah.png';

function PageHeader() {
    return (
      <div className="topHeader">
        <img src={logo} alt="" />
        <div>Data Stories</div>
      </div>
    )
}

export default PageHeader;
