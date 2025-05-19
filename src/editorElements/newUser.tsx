import React, {useEffect, useState} from "react";
import {API_URL} from "../misc/functions";

export default function NewUser({reload, uuid}: {reload: Function, uuid: string}) {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [userEppn, setUserEppn] = useState("");

    async function getUsers() {
        const response = await fetch(API_URL + 'get_setting_users?ds=' + uuid);
        const data = await response.json();
        setUsers(data);
        setUserEppn(data[0]["eppn"]);
        setLoading(false);
    }

    async function addUser() {
        const response = await fetch(API_URL + 'add_user_rights?ds=' + uuid + '&eppn=' + userEppn);
        const data = await response.json();
        reload();
    }



    useEffect(() => {
        getUsers();
    }, [loading])

    return (<div className="settingsItem">
        {loading ? (<div>
            Loading users...
        </div>) : (
            <div>
                <div className="sharedWithRow">Add rights for user</div>
            <select onChange={e => setUserEppn(e.currentTarget.value)}>
                {users.map((item, index) => {
                    return (<option value={item["eppn"]}>{item["email"]}</option>)
                })}
            </select>
            </div>)}

        <button className="editorPanelBtn" onClick={() => {addUser()}}>Save</button>
        <button className="editorPanelBtn" onClick={() => {reload()}}>Discard</button>
    </div>)
}