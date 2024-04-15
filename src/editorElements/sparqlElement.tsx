import React from "react";
import {useEffect, useState} from "react";
import Yasgui from "@triply/yasgui";
import "@triply/yasgui/build/yasgui.min.css";
import ProvenanceElement from "./provenanceElement";
import MetadataElement from "./metaDataElement";
import Geo from "huc-geo-plugin";
import Chart from "huc-chart-plugin";
import {API_URL} from "../misc/functions";

function SparqlElement({block, endpoint, store, changeStyle}: {block: object, endpoint: string, store: string, changeStyle: Function}) {
    const [editorStatus, setEditorStatus] = useState("data");
    const hasEndpoint = endpoint !== 'no_endpoint';
    const hasQueryFile = block["_attributes"]["href"] !== undefined;
    const yasGeo = Geo;
    const yasChart = Chart;
    let yasProps;


    function handleChange() {
        console.log("Hello");
    }

    function setBrowser(yasgui) {
        if (block["_cdata"] !== undefined) {
            handleQuery(yasgui, block["_cdata"]);
        } else {
            if (hasQueryFile) {
                get_sparql(yasgui);
            }
        }
        yasProps = yasgui;
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

    function saveBlock() {
        console.log(yasProps.getTab().yasr.selectedPlugin);
        changeStyle();
    }

    function yasMerin() {
        if (hasEndpoint) {
            localStorage.removeItem("yagui__config");
            const list = document.getElementById("yasgui_ed").getElementsByClassName("yasgui");
            Yasgui.Yasr.registerPlugin("Geo", yasGeo);
            Yasgui.Yasr.registerPlugin("Chart", yasChart);
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
        <div>
            {editorStatus === "data" && <div><div className="editorPanel">
                <button className="editorPanelBtn" onClick={() => {setEditorStatus("metadata")}}>Metadata</button>
                <button className="editorPanelBtn" onClick={() => {setEditorStatus("provenance")}}>Provenance</button>
            </div>
            <div>
                {hasEndpoint ? (<div>
                        <div className="editorPanel">
                            <button className="editorPanelBtn" onClick={() => {alert('Metadata editor forthcoming.')}}>Metadata</button>
                            <button className="editorPanelBtn" onClick={() => {alert('Provenance editor forthcoming.')}}>Provenance</button>
                            <button className="editorPanelBtn" onClick={() => {saveBlock();}}>Save</button>
                            <button className="editorPanelBtn" onClick={() => {changeStyle();}}>Discard</button>
                        </div>
                    <h1>Edit query block</h1>
                    <h4>Header</h4>
                    <div className="editorWrapper">
                    <input type="text" id="header" defaultValue={block["ds:Metadata"]["dct:title"]["_text"]}  size={200} />
                    </div>
                    <h4>Query file</h4>
                    {hasQueryFile ? (
                        <div>
                            <div>{block["_attributes"]["href"]}</div><br/>
                            <div><button>Delete</button></div>
                        </div>
                    ) : (
                        <div>
                        <div>No query file</div><br/>
                        <button>Add</button>
                        </div>
                    )}

                    <h4>Query</h4>
                    <div id="yasgui_ed" /></div>) : (<div>No endpoint defined!</div>)}
            </div></div>}
            {editorStatus === "provenance" && <ProvenanceElement setEditorStatus={setEditorStatus}/>}
            {editorStatus === "metadata" && <MetadataElement setEditorStatus={setEditorStatus}/>}
        </div>
    )
}

export default SparqlElement;