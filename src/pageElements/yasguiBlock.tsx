import React, {ReactElement, useState} from "react";
import {useEffect} from "react";
import Yasgui from "@triply/yasgui";
import "@triply/yasgui/build/yasgui.min.css";
import MenuAddBox from "./menuAddBox";
import '../assets/css/yasgui-browser.css';
import {API_URL} from "../misc/functions";

export default function YasguiBlock({contentHead, content, store} : {contentHead: string, content: object, store: string}): ReactElement {
    localStorage.removeItem("yagui__config");
    const hasHead = contentHead !== '';
    const yas_id: string = "yasgui_" + content['_attributes']["xml:id"];

    function setBrowser(yasgui) {
        if (content["_cdata"] !== undefined) {
            handleQuery(yasgui, content["_cdata"]);
            console.log(content["_cdata"]);
        } else {
            get_sparql(yasgui);
        }
    }

    async function get_sparql(yasgui) {
        const response = await fetch(API_URL + store + '/' + content['_attributes']['href']);
        const spq = await response.text();
        handleQuery(yasgui, spq);
    }

    function handleQuery(yasgui, query) {
        let tab = yasgui.getTab();
        tab.yasr.storePluginConfig('table', {"compact": true});
        tab.setQuery(query);
        tab.query();
    }

    function yasMerin() {
        const list = document.getElementById(yas_id).getElementsByClassName("yasgui");
        Yasgui.Yasr.plugins.table.defaults.compact = true;
        Yasgui.Yasr.plugins.table.defaults.pageSize = 6;
        if (list.length === 0) {
            const yasgui = new Yasgui(document.getElementById(yas_id) as HTMLElement, {requestConfig:
                    {endpoint: "https://druid.datalegend.net/dataLegend/deaths-1910-1920/sparql/deaths-1910-1920"}});
            setBrowser(yasgui);
        }

    }

    useEffect(() => {
        yasMerin();
    });

    return (
        <div className="dsTextBlock">
            {hasHead && (<h2>{contentHead}</h2>)}
            <div className="dsTextBlockContent">
                <div id={yas_id} />
            </div>
        </div>
    )
}