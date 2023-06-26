import React from "react";
import ReactDOM from "react-dom";
import MDEditor, { selectWord } from "@uiw/react-md-editor";
function MarkdownElement() {
    const [value, setValue] = React.useState("");
    const [headerValue, setHeaderValue] = React.useState("");


    return (
        <div>
            <h1>Edit markdown block</h1>
            <h4>Header</h4>
            <div className="editorWrapper">
            <input type="text" id="header" size={200} />
            </div>
            <h4>Text</h4>
            <div data-color-mode="light" className="editorWrapper">
            <MDEditor height={400}  value={value} onChange={setValue} />
            </div>
        </div>
    )
}

export default MarkdownElement;