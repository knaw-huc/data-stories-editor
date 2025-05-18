import React, {useState} from "react";
import AuthorizationElement from "./authorizationElement";

export default function UserRights({item, uuid}: {item: object, uuid: string}) {
    const [editRights, setEditRights] = useState(false);

    function remove(eppn, email) {
        if (window.confirm("Revoke rights of user " + email + "?")) {
            console.log(email);
        }
    }

    return (
        <div>
            <div className="sharedWithRow">
                <div className="shareName">{item["email"]}</div>
                <div className="shareRights">{item["rights"]}</div>
                <div className="shareButton" style={{cursor: "pointer"}} onClick={() => setEditRights(true)}>edit</div>
                <div className="shareButton" style={{cursor: "pointer"}} onClick={() => {remove(item["eppn"], item["email"])}}>delete</div>
            </div>
            <div>
                {editRights && <AuthorizationElement setEditRights={setEditRights} rights={item["rights"]}/>}
            </div>
        </div>
    )
}