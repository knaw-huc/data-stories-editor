import React, {useState} from "react";

export default function AuthorizationElement({setEditRights, rights}: {setEditRights: Function, rights: string}) {
    const [userRights, setUserRights] = useState(rights.split(""));
    const [refresh, setRefresh] = useState(false);
    const labels = [
        "Read story", "Write story", "Delete story", "Comment on story", "Change story settings"
    ];
    const values = ["R", "W", "D", "C", "S"];
    let ro = true;

    const isItemChecked = (i) => {
        if (rights[i] === "-") {
            return false;
        } else {
            return true;
        }
    }

    function handleOnChange(index) {

    }

    return (
        <div className="sharedWithRow">
            <div>
                {userRights.map((item, index) => {
                    if (values[index] === 'R') {
                        ro = true
                    } else {
                        ro = false;
                    }
                    return (<li className="rightsList">
                        <input style={{display: "inline"}}
                            type="checkbox"
                            disabled={ro}
                            id={`custom-checkbox-${index}`}
                            value={values[index]}
                            checked={isItemChecked(index)}
                            onChange={() => handleOnChange(index)}
                        />
                        <label style={{display: "inline"}}>{labels[index]}</label>
                    </li>)}
                )}
            </div>
            <button style={{margin: "20px 30px"}} onClick={() => setEditRights(false)}>Save</button>
        </div>
    )
}