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
    const [caption, setCaption] = useState<string>(block["ds:Metadata"]["dct:title"]["_text"]);
    const [provenance, setProvenance] = useState(block["ds:Provenance"]);
    const hasEndpoint = endpoint !== 'no_endpoint';
    const hasQueryFile = block["_attributes"]["href"] !== undefined;
    const yasGeo = Geo;
    const yasChart = Chart;
    const blockID = 'yasgui_' + block["_attributes"]["xml:id"];
    let yasProps = null;
    localStorage.removeItem("yagui__config");
    const reloadGraph = function () {

        yasMerin();
    }


    /*if (block["ds:Cues"] === undefined) {
        block["ds:Cues"] = {};
    }*/


    function handleChange(e: React.FormEvent<HTMLInputElement>): void {
        if (e.currentTarget.id === 'caption') {
            setCaption(e.currentTarget.value);
        }
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
        if (block["ds:Cues"]?.["ds:visualisation"]?.["_text"] !== undefined && block["ds:Cues"]["ds:visualisation"]["_text"] === 'gchart') {
            tab.yasr.selectPlugin("Chart");
            if (block["ds:Cues"]["wp4:data-output-config"] !== undefined) {
                const chartOptions = JSON.parse(block["ds:Cues"]["wp4:data-output-config"]["_cdata"]);
                tab.yasr.plugins.Chart.defaults.typeChart = chartOptions.chartConfig.chartType;
                if (document.getElementById("chartDefsBuffer").innerText !== "") {
                    let opt = JSON.parse(document.getElementById("chartDefsBuffer").innerText);
                    tab.yasr.plugins.Chart.defaults.defs = opt.chartConfig.options;
                } else {
                    tab.yasr.plugins.Chart.defaults.defs = chartOptions.chartConfig.options;
                }
                tab.yasr.plugins.Chart.defaults.reload = reloadGraph;
            }
        }
        if (block["ds:Cues"]?.["ds:visualisation"]?.["_text"] !== undefined && block["ds:Cues"]["ds:visualisation"]["_text"] === 'table') {
            tab.yasr.selectPlugin('table');
        }
        tab.setQuery(query);
        tab.query();
    }

    function saveBlock() {
        block["ds:Metadata"]["dct:title"] = {"_text": caption};
        if (yasProps !== null) {
            let tab = yasProps.getTab();
            let viz = '';
            block["_cdata"] = tab.getQuery();
            switch (tab.yasr.selectedPlugin) {
                case 'Geo':
                    viz = 'geo';
                    break;
                case 'Chart':
                    viz = 'gchart';
                    block["ds:Cues"]["wp4:data-output-config"]["_cdata"] = document.getElementById("chartDefsBuffer").innerText;
                    break;
                default:
                    viz = 'table';
            }
            block["ds:Cues"]["ds:visualisation"] = {"_text": viz};
            //localStorage.removeItem("yagui__config");
            document.getElementById(blockID).innerHTML= '';
        }
        changeStyle();
    }

    function yasMerin() {
        if (hasEndpoint) {
            localStorage.removeItem("yagui__config");
            document.getElementById("yasgui_ed").innerHTML = '';
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
                yasProps = yasgui;
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
                            <button className="editorPanelBtn" onClick={() => {setEditorStatus("metadata")}}>Metadata</button>
                            <button className="editorPanelBtn" onClick={() => {setEditorStatus("provenance")}}>Provenance</button>
                            <button className="editorPanelBtn" onClick={() => {saveBlock();}}>Save</button>
                            <button className="editorPanelBtn" onClick={() => {changeStyle();}}>Discard</button>
                        </div>
                    <h1>Edit query block</h1>
                    <h4>Header</h4>
                    <div className="editorWrapper">
                    <input type="text" id="caption" defaultValue={caption}  size={200} onChange={handleChange}/>

                    </div>
                    <div id="chartDefsBuffer"></div>
                    {/*<h4>Query file</h4>
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
                    )}*/}

                    <h4>Query</h4>
                    <div id="yasgui_ed" /></div>) : (<div>No endpoint defined!</div>)}
            </div></div>}
            {editorStatus === "provenance" && <ProvenanceElement provenanceBlock={block["ds:Provenance"]} setP={setProvenance} setEditorStatus={setEditorStatus}/>}
            {editorStatus === "metadata" && <MetadataElement setEditorStatus={setEditorStatus}/>}
        </div>
    )
}

export default SparqlElement;