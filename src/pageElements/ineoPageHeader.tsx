import React from 'react';
import logo from '../assets/img/logo_clariah.png';
import {useNavigate} from "react-router-dom";
import {API_URL} from "../misc/functions";

function PageHeader() {
    const nav = useNavigate();

    async function login() {
        nav(0);
    }


    return (
        <div className="topHeader">
            <div className="topHeader__brand">
                <img src={logo} alt=""/>
                <div className="dsBrandName isLinkElement" onClick={() => {nav("/")}}>Data Stories</div>
            </div>
            <div>
                <nav id="login_status"><div style={{"cursor": "pointer"}} onClick={() => {login()}}>
                    Login
                </div>
                </nav>
            </div>
        </div>
    )
}

export default PageHeader;
