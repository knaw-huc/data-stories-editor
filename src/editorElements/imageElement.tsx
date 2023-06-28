import React, {useState} from "react";

function ImageElement({block, changeStyle}: { block: object, changeStyle: Function }) {
    const [caption, setCaption] = useState<string>("");
    const [url, setUrl] = useState<string>("");
    const [file, setFile] = useState<File>();
    const UPLOAD_URL = "http://localhost/ds_img/";

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
            fetch('http://localhost:5000/uploader', {
                method: 'POST',
                body: formData,
            })
                .then((res) => res.json())
                .then((data) => {
                    setUrl(UPLOAD_URL + file.name)
                    writeToBlock();
                })
                .catch((err) => console.error(err));
        } else {
            if (url !== "") {
               writeToBlock();
            } else {
                alert("No image added!");
            }
        }
    }

    function writeToBlock() {
        block["_attributes"]["href"] = url;
        block["ds:Metadata"]["dct:title"]["_text"] = caption;
        changeStyle();
    }

    return (
        <div>
            <h1>Select or upload image</h1>
            <div className="editorWrapper">
                <h4>Caption</h4>
                <input type="text" id="caption" defaultValue={caption} size={200} onChange={handleChange}/>
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