import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import {SettingsLoaderFunction} from "./settingsLoader";
import {API_URL} from "../misc/functions";

function StorySettings() {
    const navigate = useNavigate();
    const params = useParams();
    const store = params.store as string;
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState("D");
    const [title, setTitle] = useState("");

    async function get_settings(store) {
        const response = await fetch(API_URL + '/settings/?ds=' + store);
        const data = await response.json();
        setStatus(data.status);
        setTitle(data.title);
        setLoading(false);
    }

    async function save() {
        const jsonStruc = {"id": store, "status": status}
        console.log(jsonStruc);
        const result = await fetch(API_URL + '/set_settings', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonStruc)
        });
        const res = await result.json()
        navigate("/");
    }

    useEffect(() => {
        const data = get_settings(store);
        setLoading(false);
    }, [loading]);

    return (<>
        <div className="dataStoryBlocks">
            <div className="settingsBlock">
                <h1>Datastory settings</h1>
                <h3>{title}</h3>
                <div className="settingsItem">
                    <div className="settingItemHeader">Status</div>
                    <div><select value={status} onChange={(e) => {setStatus(e.currentTarget.value)}}>
                        <option value="D">Draft</option>
                        <option value="P">Published</option>
                    </select></div>
                    <div className="settingsBtnBar"><button className="editorPanelBtn" onClick={() => {save()}}>Save</button></div>
                </div>
                <div className="settingsItem">
                    <div className="settingItemHeader">Sharing <span className="addShareBtn">+</span></div>
                    <div className="sharedWithRow">
                        <div className="shareName">menzo.windhouwer@di.huc.knaw.nl</div>
                        <div className="shareRights">Full control</div>
                        <div className="shareButton">edit</div>
                        <div className="shareButton">delete</div>
                    </div>
                    <div></div>
                </div>
                <div className="settingsBtnBar"><button className="editorPanelBtn" onClick={() => navigate("/")}>Close</button></div>
            </div>
        </div>
    </>);
}

export default StorySettings;