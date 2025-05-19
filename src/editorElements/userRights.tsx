import React, {useState} from "react";
import AuthorizationElement from "./authorizationElement";
import {API_URL} from "../misc/functions";

export default function UserRights({reload, item, uuid}: {reload: Function, item: object, uuid: string}) {
    const [editRights, setEditRights] = useState(false);

    function remove(eppn) {
        if (window.confirm("Revoke rights of user " + uuid + "?")) {
            revoke_user_rights(eppn);
        }
    }

    async function revoke_user_rights(eppn) {
        const response = await fetch(API_URL + 'revoke_user_rights?ds=' + uuid + '&eppn=' + eppn);
        const data = await response.json();
        reload();
    }


    return (
        <div>
            <div className="sharedWithRow">
                <div className="shareName">{item["email"]}</div>
                <div className="shareRights">{item["rights"]}</div>
                <div className="shareButton" style={{cursor: "pointer"}} onClick={() => setEditRights(true)}>edit</div>
                <div className="shareButton" style={{cursor: "pointer"}} onClick={() => {remove(item["eppn"])}}>delete</div>
            </div>
            <div>
                {editRights && <AuthorizationElement uuid={uuid} eppn={item["eppn"]} setEditRights={setEditRights} rights={item["rights"]} reload={reload}/>}
            </div>
        </div>
    )
}