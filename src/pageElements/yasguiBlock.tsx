import React, {useState} from "react";
import {useEffect} from "react";
import Yasgui from "@triply/yasgui";
import "@triply/yasgui/build/yasgui.min.css";
import MenuAddBox from "./menuAddBox";

export default function YasguiBlock() {
    const [collapsed, setCollapsed] = useState(false);
    const [menuActive, setMenuActive] = useState(false);

    function alter() {
        if (!collapsed) {
            setCollapsed(true);
            let obj = document.getElementById("yasgui");
            if (obj !== null) {
                obj.classList.add("noView");
            }

        } else {
            setCollapsed(false);
            let obj = document.getElementById("yasgui");
            if (obj !== null) {
                obj.classList.remove("noView");
            }
        }
    }

    function yasMerin() {
        const list = document.getElementsByClassName("yasgui");
        if (list.length === 0) {
            const yasgui = new Yasgui(document.getElementById("yasgui") as HTMLElement, {});
        }
    }

    useEffect(() => {
        yasMerin();
    }, []);

    return (
        <div className="dsTextBlock">
            <div className="dsBlockHeadMenu">
                <ul>
                    <li><span className="material-symbols-sharp">toggle_off</span> Metadata</li>
                    <li><span className="material-symbols-sharp">toggle_off</span> Notes & commentaries</li>
                    <li><span className="material-symbols-sharp">toggle_off</span> Provenance</li>
                </ul>
                <div className="dsTypeName">QUERY</div>
            </div>
            <div className="dsTextBlockContent">
                <div id="yasgui" />
            </div>
            <div className="dsBlockMenuBottom">
                <ul>
                    <li onClick={() => {setMenuActive(true)}}><span className="material-symbols-sharp">add_box</span> Add block below</li>
                    <li><span className="material-symbols-sharp">pinch</span> Move this block</li>
                    <li onClick={() => {alter()}}>{!collapsed ? (<React.Fragment><span className="material-symbols-sharp">unfold_less</span>Collapse block</React.Fragment>) :(<React.Fragment><span className="material-symbols-sharp">unfold_more</span>Expand block</React.Fragment>)}</li>
                </ul>
            </div>
            {menuActive && (<div className="dsMenuBox" onClick={() => {setMenuActive(false)}}>
                <MenuAddBox/>
            </div>)}
        </div>
    )
}