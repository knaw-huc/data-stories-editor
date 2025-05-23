import React, {useState} from "react";
import ReactDOM from "react-dom";
import MDEditor, { selectWord } from "@uiw/react-md-editor";
import ProvenanceElement from "./provenanceElement";
import MetadataElement from "./metaDataElement";


function MarkdownElement({block, changeStyle}: {block: object, changeStyle: Function}) {
    const [value, setValue] = React.useState(block["_text"]);
    const [provenance, setProvenance] = React.useState(block["ds:Provenance"]);
    const [headerValue, setHeaderValue] = React.useState(block["ds:Metadata"]["dct:title"]["_text"]);
    const [editorStatus, setEditorStatus] = useState("data");


    function saveBlock() {
        block["_text"] = value;
        block["ds:Metadata"]["dct:title"]["_text"] = headerValue;
        block["ds:Provenance"] = provenance;
        console.log(block);
        changeStyle();
    }

    const sp = (provStruc) =>
    {
        setProvenance(provStruc);
        console.log(provStruc);
        console.log(provenance);
    }

    function init() {
        if (value !== block["_text"] || headerValue !== block["ds:Metadata"]["dct:title"]["_text"]) {
            setValue(block["_text"]);
            setHeaderValue(block["ds:Metadata"]["dct:title"]["_text"]);
            //console.log(headerValue);
        }

    }

    function handleChange(e: React.FormEvent<HTMLInputElement>): void {
        setHeaderValue(e.currentTarget.value);
    }

    //init();

    return (
        <div>
            {editorStatus === "data" && <div><div className="editorPanel">
                <button className="editorPanelBtn" onClick={() => {setEditorStatus("metadata")}}>Metadata</button>
                <button className="editorPanelBtn" onClick={() => {setEditorStatus("provenance")}}>Provenance</button>
            </div>
            <h1>Edit markdown block</h1>
            <h4>Header</h4>
            <div className="editorWrapper">
            <input type="text" id="header" defaultValue={headerValue} onChange={handleChange}  size={200} />
            </div>
            <h4>Text</h4>
            <div data-color-mode="light" className="editorWrapper">
            <MDEditor height={400}  value={value} onChange={setValue} />
            </div>
                <div className="commentSaveBtn">
                <button onClick={saveBlock}>Save block</button>
                    <button onClick={() => {changeStyle()}}>Dismiss</button>
                </div></div>}
            {editorStatus === "provenance" && <ProvenanceElement provenanceBlock={provenance} setP={sp} setEditorStatus={setEditorStatus}/>}
            {editorStatus === "metadata" && <MetadataElement setEditorStatus={setEditorStatus}/>}
        </div>
    )
}

export default MarkdownElement;