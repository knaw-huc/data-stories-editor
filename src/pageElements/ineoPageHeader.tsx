import React from 'react';
import logo from '../assets/img/logo_clariah.png';

function PageHeader() {


    return (
      <div className="topHeader">
        <div className="topHeader__brand">
          <img src={logo} alt="" />
          <div>Data Stories</div>
        </div>
        <div>

          </div>
      </div>
    )
}

export default PageHeader;
