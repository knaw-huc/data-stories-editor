import React, {useState} from "react";
import Iframe from "react-iframe";

function FrameElement({block, changeStyle}: { block: object, changeStyle: Function}) {
    const [caption, setCaption] = useState<string>("");
    const [url, setUrl] = useState<string>("");
    const [preview, setPreview] = useState(false);


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
            <h1>Embed HTML</h1>
            <div className="editorWrapper">
                <h4>Caption</h4>
                <input type="text" id="caption" defaultValue={caption} size={200} onChange={handleChange}/>
                <h4>HTML URL</h4>
                <input type="text" id="url" defaultValue={url} size={200} onChange={handleChange}/>
                <button onClick={() => {setPreview(true)}}>Preview</button>
                {preview && <Iframe url={url} width="100%" height="500"/>}
                <div>
                    <button className="rowBtn" onClick={saveBlock}>Save block</button>
                </div>
            </div>
        </div>
    )
}

export default FrameElement;