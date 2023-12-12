import React, {ReactElement, useState} from "react";
import {useEffect} from "react";
import Yasgui from "@triply/yasgui";
import "@triply/yasgui/build/yasgui.min.css";
import MenuAddBox from "./menuAddBox";
import '../assets/css/yasgui-browser.css';

export default function YasguiBlock({content} : {content: object}): ReactElement {
    localStorage.removeItem("yagui__config");




    function setBrowser(yasgui) {
        if (content["_cdata"] !== undefined) {
            let tab = yasgui.getTab();
            tab.yasr.storePluginConfig('table', {"compact": true});
            tab.setQuery(content["_cdata"]);
            tab.query();

        }
    }

    function yasMerin() {
        const list = document.getElementsByClassName("yasgui");
        Yasgui.Yasr.plugins.table.defaults.compact = true;
        Yasgui.Yasr.plugins.table.defaults.pageSize = 6;
        if (list.length === 0) {
            const yasgui = new Yasgui(document.getElementById("yasgui") as HTMLElement, {requestConfig:
                    {endpoint: "https://druid.datalegend.net/dataLegend/deaths-1910-1920/sparql/deaths-1910-1920"}});
            setBrowser(yasgui);
        }

    }

    useEffect(() => {
        yasMerin();
    });

    return (
        <div className="dsTextBlock">
            <div className="dsTextBlockContent">
                <div id="yasgui" />
            </div>
        </div>
    )
}