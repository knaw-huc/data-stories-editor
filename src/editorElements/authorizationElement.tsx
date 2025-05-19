import React, {useState} from "react";
import RightsCheckBoxElement from "./rightsCheckBoxElement";
import {API_URL} from "../misc/functions";

export default function AuthorizationElement({uuid, eppn, setEditRights, rights, reload}: {uuid: string, eppn: string, setEditRights: Function, rights: string, reload: Function}) {
    const [userRights, setUserRights] = useState(rights.split(""));
    //const [refresh, setRefresh] = useState(false);
    const labels = [
        "Read story", "Write story", "Delete story", "Comment on story", "Change story settings"
    ];
    const values = ["R", "W", "D", "C", "S"];
    let ro = true;

    const isItemChecked = (i) => {
        if (userRights[i] === "-") {
            return false;
        } else {
            return true;
        }
    }

    const saveRights = (uuid, eppn, rightStr) => {
        const data = {
            uuid: uuid,
            eppn: eppn,
            rights: rightStr
        }
        sendData(data);
    }

    async function sendData(data) {
        const result = await fetch(API_URL + '/save_user_rights', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const res = await result.json()
        setEditRights(false);
        reload()
    }




    return (
        <div className="sharedWithRow">
            <div style={{display: "block"}}>
                {userRights.map((item, index) => {
                    if (values[index] === 'R') {
                        ro = true
                    } else {
                        ro = false;
                    }
                    return (
                        <div style={{display: "block"}}>
                            <RightsCheckBoxElement index={index} ro={ro} value={values[index]} isChecked={isItemChecked(index)} label={labels[index]} rights={userRights} setUserRights={setUserRights}/>
                        </div>)}
                )}
            </div>
            <div className="settingsBtnBar">
                <button  className="editorPanelBtn"  onClick={() => {saveRights(uuid, eppn, userRights.toString().replaceAll(",", ""))}}>Save</button>
                <button className="editorPanelBtn" onClick={() => setEditRights(false)}>Discard</button>
            </div>
        </div>
    )
}