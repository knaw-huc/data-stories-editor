import React, {useState} from "react";
import Iframe from "react-iframe";
import ProvenanceElement from "./provenanceElement";
import MetadataElement from "./metaDataElement";

function FrameElement({block, changeStyle}: { block: object, changeStyle: Function }) {
    const [caption, setCaption] = useState<string>(block["ds:Metadata"]["dct:title"]["_text"]);
    const [url, setUrl] = useState<string>(block["_attributes"]["href"]);
    const [preview, setPreview] = useState(false);
    const [editorStatus, setEditorStatus] = useState("data");


    function handleChange(e: React.FormEvent<HTMLInputElement>): void {
        //setHeaderValue(e.currentTarget.value);
        if (e.currentTarget.id === 'caption') {
            setCaption(e.currentTarget.value);
        }
        if (e.currentTarget.id === 'url') {
            setPreview(false);
            setUrl(e.currentTarget.value);
        }

    }

    function saveBlock() {
        if (url !== "") {
            writeToBlock(url, caption);
        } else {
            alert("No url added!");
        }
    }

    function writeToBlock(wUrl, wCaption) {
        block["_attributes"]["href"] = wUrl;
        block["ds:Metadata"]["dct:title"]["_text"] = wCaption;
        changeStyle();
    }


    return (
        <div>
            {editorStatus === "data" && <div>
                <div className="editorPanel">
                    <button className="editorPanelBtn" onClick={() => {
                        setEditorStatus("metadata")
                    }}>Metadata
                    </button>
                    <button className="editorPanelBtn" onClick={() => {
                        setEditorStatus("provenance")
                    }}>Provenance
                    </button>
                </div>
                <h1>Embed HTML</h1>
                <div className="editorWrapper">
                    <h4>Caption</h4>
                    <input type="text" id="caption" defaultValue={caption} size={200} onChange={handleChange}/>
                    <h4>HTML URL</h4>
                    <input type="text" id="url" defaultValue={url} size={200} onChange={handleChange}/>
                    <div>
                        <button className="rowBtn" onClick={() => {
                            setPreview(!preview)
                        }}>Preview
                        </button>
                    </div>
                    {preview && <Iframe url={url} width="100%" height="500"/>}
                    <div>
                        <button className="rowBtn" onClick={saveBlock}>Save block</button>
                        <button className="rowBtn" onClick={() => {
                            changeStyle();
                        }}>Dismiss
                        </button>
                    </div>
                </div>
            </div>}
            {editorStatus === "provenance" && <ProvenanceElement provenanceBlock={block["ds:Provenance"]} setEditorStatus={setEditorStatus}/>}
            {editorStatus === "metadata" && <MetadataElement setEditorStatus={setEditorStatus}/>}
        </div>
    )
}

export default FrameElement;