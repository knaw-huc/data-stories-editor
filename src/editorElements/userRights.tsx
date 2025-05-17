import React, {useState} from "react";
import AuthorizationElement from "./authorizationElement";

export default function UserRights({item}: {item: object}) {
    const [editRights, setEditRights] = useState(false);

    return (
        <div>
            <div className="sharedWithRow">
                <div className="shareName">{item["email"]}</div>
                <div className="shareRights">{item["rights"]}</div>
                <div className="shareButton" style={{cursor: "pointer"}} onClick={() => setEditRights(true)}>edit</div>
                <div className="shareButton" style={{cursor: "pointer"}}>delete</div>
            </div>
            <div>
                {editRights && <AuthorizationElement setEditRights={setEditRights} rights={item["rights"]}/>}
            </div>
        </div>
    )
}