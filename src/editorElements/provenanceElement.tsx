import React from "react";
import {provenanceFields} from "../misc/functions";

export default function ProvenanceElement({setEditorStatus}: {setEditorStatus: Function}) {
    return (
        <div>
            <h1>Provenance current block</h1>
            <div>
                <button className="editorPanelBtn" onClick={() => {setEditorStatus("data")}}>Save</button>
                <button className="editorPanelBtn" onClick={() => {setEditorStatus("data")}}>Dismiss</button>
            </div>
        </div>
    )
}