import React from 'react';
import logo from '../assets/img/logo_clariah.png';
import {useNavigate} from "react-router-dom";

function PageHeader() {
    const nav = useNavigate();


    return (
        <div className="topHeader">
            <div className="topHeader__brand">
                <img src={logo} alt=""/>
                <div className="dsBrandName isLinkElement" onClick={() => {nav("/")}}>Data Stories</div>
            </div>
            <div>
                <nav id="login_status">
                    Login
                </nav>
            </div>
        </div>
    )
}

export default PageHeader;
