import React from "react";
import {mdFields} from "../misc/functions";

export default function MetadataElement({setEditorStatus}: {setEditorStatus: Function}) {
    return (
        <div>
            <h1>Metadata current block</h1>
            <div style={{margin: 20}}>
                Metadata editor still in development...
            </div>
            <div>
                <button className="editorPanelBtn" onClick={() => {setEditorStatus("data")}}>Save</button>
                <button className="editorPanelBtn" onClick={() => {setEditorStatus("data")}}>Dismiss</button>
            </div>
        </div>
    )
}