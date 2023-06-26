import React from "react";
import {useEffect} from "react";
import Yasgui from "@triply/yasgui";
import "@triply/yasgui/build/yasgui.min.css";

function SparqlElement() {

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
        <>
            <div>
                <div id="yasgui" />
            </div>
        </>
    )
}

export default SparqlElement;