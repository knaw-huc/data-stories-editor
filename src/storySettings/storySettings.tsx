import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import {SettingsLoaderFunction} from "./settingsLoader";
import UserRights from "../editorElements/userRights";

import {API_URL} from "../misc/functions";
import NewUser from "../editorElements/newUser";

function StorySettings() {
    const navigate = useNavigate();
    const params = useParams();
    const store = params.store as string;
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState("D");
    const [title, setTitle] = useState("");
    const [rights, setRights] = useState([]);
    const [newUser, setNewUser] = useState(false);


    async function get_settings(store) {
        const response = await fetch(API_URL + '/settings/?ds=' + store);
        const data = await response.json();
        setStatus(data.status);
        setTitle(data.title);
        setRights(data.rights);
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

    const reload = () => {
        setLoading(true);
        setNewUser(false);
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
                    <div className="settingItemHeader">Sharing <span className="addShareBtn" onClick={() => {setNewUser(true)}}>+</span></div>
                    {rights.map((item, index) => {
                        return (<UserRights item={item} key={index} uuid={store}/>);
                    })}
                </div>
                {newUser && <NewUser reload={reload} uuid={store}/>}
                <div className="settingsBtnBar"><button className="editorPanelBtn"  onClick={() => navigate("/")}>Close</button></div>
            </div>
        </div>
    </>);
}

export default StorySettings;