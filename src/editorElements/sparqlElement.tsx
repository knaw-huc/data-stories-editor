import React from "react";
import {useEffect} from "react";
import Yasgui from "@triply/yasgui";
import "@triply/yasgui/build/yasgui.min.css";

import Geo from "huc-geo-plugin";
import {API_URL} from "../misc/functions";

function SparqlElement({block, endpoint, store, changeStyle}: {block: object, endpoint: string, store: string, changeStyle: Function}) {

    const hasEndpoint = endpoint !== 'no_endpoint';

    function setBrowser(yasgui) {
        if (block["_cdata"] !== undefined) {
            handleQuery(yasgui, block["_cdata"]);
        } else {
            get_sparql(yasgui);
        }
    }

    async function get_sparql(yasgui) {
        const response = await fetch(API_URL + store + '/' + block['_attributes']['href']);
        const spq = await response.text();
        handleQuery(yasgui, spq);
    }

    function handleQuery(yasgui, query) {
        let tab = yasgui.getTab();
        tab.yasr.storePluginConfig('table', {"compact": true});
        if (block["ds:Cues"]?.["ds:visualisation"]?.["_text"] !== undefined && block["ds:Cues"]["ds:visualisation"]["_text"] === 'geo') {
            tab.yasr.selectPlugin("Geo");
        }
        tab.setQuery(query);
        tab.query();
    }

    function yasMerin() {
        if (endpoint) {
            localStorage.removeItem("yagui__config");
            const list = document.getElementById("yasgui_ed").getElementsByClassName("yasgui");
            Yasgui.Yasr.plugins.table.defaults.compact = true;
            Yasgui.Yasr.plugins.table.defaults.pageSize = 6;
            if (list.length === 0) {
                const yasgui = new Yasgui(document.getElementById("yasgui_ed") as HTMLElement, {
                    requestConfig:
                        {endpoint: endpoint}
                });
                setBrowser(yasgui);
            }
        }
    }

    useEffect(() => {
        yasMerin();
    }, []);


    return (
        <>
            <div>
                {endpoint ? (<div>
                        <div className="editorPanel">
                            <button className="editorPanelBtn" onClick={() => {alert('Metadata editor forthcoming.')}}>Metadata</button>
                            <button className="editorPanelBtn" onClick={() => {alert('Provenance editor forthcoming.')}}>Provenance</button>
                        </div>
                    <h1>Edit query block</h1>
                    <h4>Header</h4>
                    <div className="editorWrapper">
                    <input type="text" id="header" defaultValue={block["ds:Metadata"]["dct:title"]["_text"]}  size={200} />
                    </div>
                    <h4>Query</h4>
                    <div id="yasgui_ed" /></div>) : (<div>No endpoint defined!</div>)}

            </div>
        </>
    )
}

export default SparqlElement;