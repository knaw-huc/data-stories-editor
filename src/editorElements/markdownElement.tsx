import React from "react";
import ReactDOM from "react-dom";
import MDEditor, { selectWord } from "@uiw/react-md-editor";
function MarkdownElement({block, changeStyle}: {block: object, changeStyle: Function}) {
    const [value, setValue] = React.useState(block["_text"]);
    const [headerValue, setHeaderValue] = React.useState(block["ds:Metadata"]["dct:title"]["_text"]);

    function saveBlock() {
        block["_text"] = value;
        block["ds:Metadata"]["dct:title"]["_text"] = headerValue;
        changeStyle();
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
            <div className="editorPanel">
                <button className="editorPanelBtn" onClick={() => {alert('Metadata editor forthcoming.')}}>Metadata</button>
                <button className="editorPanelBtn" onClick={() => {alert('Provenance editor forthcoming.')}}>Provenance</button>
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
            <button onClick={saveBlock}>Save block</button>
        </div>
    )
}

export default MarkdownElement;