import React, {ReactElement, useState} from "react";
import {useEffect} from "react";
import Yasgui from "@triply/yasgui";
import "@triply/yasgui/build/yasgui.min.css";
import MenuAddBox from "./menuAddBox";
import '../assets/css/yasgui-browser.css';
import {API_URL} from "../misc/functions";
import Geo from "huc-geo-plugin";
import Chart from "huc-chart-plugin";


export default function YasguiBlock({
                                        contentHead,
                                        content,
                                        store,
                                        endpoint
                                    }: { contentHead: string, content: object, store: string, endpoint: string }): ReactElement {
    localStorage.removeItem("yagui__config");
    const [canQuery, setCanQuery] = useState(false);
    const hasHead = contentHead !== '';
    const yas_id: string = "yasgui_" + content['_attributes']["xml:id"];
    const yasGeo = Geo;
    const yasChart = Chart;
    const [yas, setYas] = useState(null);
    let yasBuffer = null;

    function setBrowser(yasgui) {
        if (content["_cdata"] !== undefined) {
            handleQuery(yasgui, content["_cdata"]);
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
        tab.yasr.selectPlugin('table');
        if (content["ds:Cues"]?.["ds:visualisation"]?.["_text"] !== undefined && content["ds:Cues"]["ds:visualisation"]["_text"] === 'geo') {
            tab.yasr.selectPlugin("Geo");
        }
        if (content["ds:Cues"]?.["ds:visualisation"]?.["_text"] !== undefined && content["ds:Cues"]["ds:visualisation"]["_text"] === 'gchart') {
            tab.yasr.selectPlugin("Chart");
            if (content["ds:Cues"]["wp4:data-output-config"] !== undefined) {
                const chartOptions = JSON.parse(content["ds:Cues"]["wp4:data-output-config"]["_cdata"]);
                tab.yasr.plugins.Chart.defaults.typeChart = chartOptions.chartConfig.chartType;
                tab.yasr.plugins.Chart.defaults.defs = chartOptions.chartConfig.options;
            }
        }
        if (content["ds:Cues"]?.["ds:visualisation"]?.["_text"] !== undefined && content["ds:Cues"]["ds:visualisation"]["_text"] === 'table') {
            tab.yasr.selectPlugin('table');
        }
        tab.setQuery(query);
        tab.query();
    }

    function yasMerin() {
        if (endpoint !== "no_endpoint") {
            localStorage.removeItem("yagui__config");
            const list = document.getElementById(yas_id).getElementsByClassName("yasgui");
            Yasgui.Yasr.registerPlugin("Geo", yasGeo);
            Yasgui.Yasr.registerPlugin("Chart", yasChart);
            Yasgui.Yasr.plugins.table.defaults.compact = true;
            Yasgui.Yasr.plugins.table.defaults.pageSize = 6;
            if (list.length === 0) {
            const yasgui = new Yasgui(document.getElementById(yas_id) as HTMLElement, {
                    requestConfig:
                        {endpoint: endpoint}
                });
                setYas(yasgui);
                setBrowser(yasgui);
            }
        }
    }

    useEffect(() => {
        yasMerin();
    });

    return (
        <div className="dsTextBlock">
            {hasHead && (<h2>{contentHead}</h2>)}
            <div className="dsTextBlockContent">
                {endpoint === "no_endpoint" && (
                    <p>No endpoint defined!</p>
                )}
                {canQuery ? (<div><div title="Close query editor" className="querySwitch" onClick={() => {
                        document.getElementById(yas_id).innerHTML= '';
                        yasMerin();
                        setCanQuery(false);
                    }}>⇊</div><div id={yas_id} className="yasgui_query_permitted"/></div>)
                    :
                    (<div><div title="Edit query" className="querySwitch" onClick={() => {
                        setCanQuery(true)
                    }}>⇈</div>
                        <div id={yas_id} className="yasgui_readOnly"/></div>)}

            </div>
        </div>
    )
}