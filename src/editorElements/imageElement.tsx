import React, {useState} from "react";
import ProvenanceElement from "./provenanceElement";
import MetadataElement from "./metaDataElement";

function ImageElement({block, changeStyle, setCurrentEditBlock, uuid}: { block: object, changeStyle: Function, setCurrentEditBlock: Function, uuid: string }) {
    const [caption, setCaption] = useState<string>(block["ds:Metadata"]["dct:title"]["_text"]);
    const [url, setUrl] = useState<string>(block["_attributes"]["href"]);
    const [file, setFile] = useState<File>();
    const [editorStatus, setEditorStatus] = useState("data");
    const UPLOAD_URL = "http://localhost:5000/";

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
            fetch(UPLOAD_URL + 'upload', {
                method: 'POST',
                body: formData,
            })
                .then((res) => res.json())
                .then((data) => {
                    setUrl(UPLOAD_URL + uuid + "/images/" + file.name)
                    writeToBlock(UPLOAD_URL + uuid + "/images/" + file.name, caption);
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
                <div>
                    <button className="rowBtn" onClick={saveBlock}>Save block</button>
                </div>
            </div></div>}
                {editorStatus === "provenance" && <ProvenanceElement setEditorStatus={setEditorStatus}/>}
                {editorStatus === "metadata" && <MetadataElement setEditorStatus={setEditorStatus}/>}
        </div>
    )
}

export default ImageElement;