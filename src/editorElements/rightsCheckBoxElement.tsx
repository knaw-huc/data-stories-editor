import React, {useState} from "react";

export default function RightsCheckBoxElement({index, ro, value, isChecked, label, rights, setUserRights}:
{index: number, ro: boolean, value: string, isChecked: boolean, label: string, rights: object, setUserRights: Function}) {

    const [checked, setChecked] = useState(isChecked)
    const handleOnChange = (e) => {
        setChecked(e.target.checked);
        let rlist = rights;
        if (e.target.checked) {
            rlist[index] = e.target.value;
        } else {
            rlist[index] = "-";
        }
        setUserRights(rlist);
    }

    return (<li className="rightsList" key={index}>
        <input style={{display: "inline"}}
               type="checkbox"
               disabled={ro}
               id={`custom-checkbox-${index}`}
               value={value}
               checked={checked}
               onChange={handleOnChange}
        />
        <label style={{display: "inline"}}>{label}</label>
    </li>)
}