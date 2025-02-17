import React from 'react';
import logo from '../assets/img/logo.png';

function PageHeader() {
    return (
        <div>
            <div className="hcContentContainer bgColorBrand1 hcMarginBottom1">
                <header className=" hcPageHeaderSimple hcBasicSideMargin">
                    <div className="hcBrand">
                        <div className="hcBrandLogo">
                            <img src={logo} className="logo"/>
                        </div>
                        <div className="hcHeaderText isLinkElement">
                            CLARIAH Data Stories Editor
                        </div>
                    </div>
                    <nav>
                        <a href="#">Rob Zeeman</a>
                        <a href="#">Logout</a>
                    </nav>
                </header>
            </div>
            <div className="topMenuFrame">
                <ul className="topMenu">
                    <li title="New data story"><span className="material-symbols-sharp">add_circle</span></li>
                    <li title="Open data story"><span className="material-symbols-sharp">open_in_new</span></li>
                    <li title="Export data story to PDF of HTML"><span className="material-symbols-sharp">download_for_offline</span></li>
                    <li title="Delete data story"><span className="material-symbols-sharp">delete</span></li>
                </ul>
            </div>
        </div>
    )
}

export default PageHeader;