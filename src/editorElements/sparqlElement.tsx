import React from "react";
import {useEffect} from "react";
import Yasgui from "@triply/yasgui";
import "@triply/yasgui/build/yasgui.min.css";

import Geo from "huc-geo-plugin";

function SparqlElement() {

    function yasMerin() {
        const list = document.getElementsByClassName("yasgui");
        if (list.length === 0) {
            const yasgui_ed = new Yasgui(document.getElementById("yasgui") as HTMLElement, {});
        }
    }

    useEffect(() => {
        yasMerin();
    }, []);

    localStorage.removeItem("yagui__config");
    return (
        <>
            <div>
                <div id="yasgui_ed" />
            </div>
        </>
    )
}

export default SparqlElement;