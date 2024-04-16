import React from "react";
import {useState} from "react";

export default function ProvenanceElement({setEditorStatus}: {setEditorStatus: Function}) {
    const [provValues, setProvValues] = useState([{"type": "", "value": ""}]);
    const [refresh, setRefresh] = useState(true);

    return (
        <div>
            <h1>Provenance current block</h1>
            <div style={{margin: 20}}>
                Provenance editor still in development...
            </div>
            <div>
                <button className="editorPanelBtn" onClick={() => {setEditorStatus("data")}}>Save</button>
                <button className="editorPanelBtn" onClick={() => {setEditorStatus("data")}}>Dismiss</button>
            </div>
        </div>
    )
}