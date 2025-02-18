import React from "react";
import {useNavigate, useParams, useLoaderData} from "react-router-dom";
import {useState} from "react";

function StorySettings() {
    const navigate = useNavigate();
    const params = useParams();
    const store = params.store as string;
    const [status, setStatus] = useState("");



    return (<>
        <div className="dataStoryBlocks">
            <div className="settingsBlock">
                <h1>Datastory settings</h1>
                <div className="settingsItem">
                    <div className="settingItemHeader">Status</div>
                    <div><select value={status}>
                        <option value="D">Draft</option>
                        <option value="P">Production</option>
                    </select></div>
                    <div className="settingsBtnBar"><button className="editorPanelBtn">Save</button> <button className="editorPanelBtn" onClick={() => navigate("/")}>Dismiss</button></div>
                </div>
            </div>
        </div>
    </>);
}

export default StorySettings;