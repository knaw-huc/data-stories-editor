import React, {useState} from "react";
import ProvenanceElement from "./provenanceElement";
import MetadataElement from "./metaDataElement";
import {API_URL} from "../misc/functions";

function ImageElement({block, changeStyle, setCurrentEditBlock, uuid}: { block: object, changeStyle: Function, setCurrentEditBlock: Function, uuid: string }) {
    const [caption, setCaption] = useState<string>(block["ds:Metadata"]["dct:title"]["_text"]);
    const [url, setUrl] = useState<string>(block["_attributes"]["href"]);
    const [provenance, setProvenance] = useState(block["ds:Provenance"]);
    const [file, setFile] = useState<File>();
    const [editorStatus, setEditorStatus] = useState("data");

    /*if (block["ds:Provenance"] === undefined) {
        block["ds:Provenance"] = [];
    }*/

    function handleChange(e: React.FormEvent<HTMLInputElement>): void {
        //setHeaderValue(e.currentTarget.value);
        if (e.currentTarget.id === 'caption') {
            setCaption(e.currentTarget.value);
        }
        if (e.currentTarget.id === 'url') {
            setUrl(e.currentTarget.value);
        }
        if (e.currentTarget.id === 'img') {
            setFile(e.currentTarget.files[0]);
        }
    }



    function saveBlock() {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('uuid', uuid);
            fetch(API_URL + 'upload', {
                method: 'POST',
                body: formData,
            })
                .then((res) => res.json())
                .then((data) => {
                    setUrl(API_URL + uuid + "/images/" + file.name)
                    writeToBlock(API_URL + uuid + "/images/" + file.name, caption);
                })
                .catch((err) => console.error(err));
        } else {
            if (url !== "") {
               writeToBlock(url, caption);
            } else {
                alert("No image added!");
            }
        }
    }

    function writeToBlock(wUrl, wCaption) {
        block["_attributes"]["href"] = wUrl;
        block["ds:Metadata"]["dct:title"]["_text"] = wCaption;
        changeStyle();
        //setCurrentEditBlock({"block_id": ""});
    }


    return (
        <div>
            {editorStatus === "data" && <div>
                <div className="editorPanel">
                <button className="editorPanelBtn" onClick={() => {setEditorStatus("metadata")}}>Metadata</button>
                <button className="editorPanelBtn" onClick={() => {setEditorStatus("provenance")}}>Provenance</button>
            </div>
            <h1>Select or upload image</h1>
            <div className="editorWrapper">
                <h4>Caption</h4>
                <input type="text" id="caption" defaultValue={caption} size={200} onChange={handleChange}/>
                <input type="hidden" id="uuid" value={uuid}/>
                <h4>Image URL</h4>
                <input type="text" id="url" defaultValue={url} size={200} onChange={handleChange}/>
                <h4>Or upload image</h4>
                <input type="file" id="img" onChange={handleChange}/>
                <div className="commentSaveBtn">
                    <button className="rowBtn" onClick={saveBlock}>Save block</button>
                    <button onClick={() => {changeStyle()}}>Dismiss</button>
                </div>
            </div></div>}
                {editorStatus === "provenance" && <ProvenanceElement provenanceBlock={block["ds:Provenance"]} setP={setProvenance} setEditorStatus={setEditorStatus}/>}
                {editorStatus === "metadata" && <MetadataElement setEditorStatus={setEditorStatus}/>}
        </div>
    )
}

export default ImageElement;