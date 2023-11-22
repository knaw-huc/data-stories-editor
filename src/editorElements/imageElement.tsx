import React, {useState} from "react";

function ImageElement({block, changeStyle, uuid}: { block: object, changeStyle: Function, uuid: string }) {
    const [caption, setCaption] = useState<string>("");
    const [url, setUrl] = useState<string>("");
    const [file, setFile] = useState<File>();
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
            fetch('http://localhost:5000/upload', {
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
    }

    return (
        <div>
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
            </div>
        </div>
    )
}

export default ImageElement;