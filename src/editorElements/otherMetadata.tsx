import React from "react";
import {useState, useEffect} from "react";
import {mdOtherFields} from "../misc/functions";
import FieldElement from "./fieldElement";

function OtherMetadata({metadata}: {metadata: object}) {
    const [editfields, setEditFields] = useState<string[]>([]);
    const [refresh, setRefresh] = useState(true);
    let list = editfields;
    let keys = Object.keys(mdOtherFields);
    let selectedKey = keys[0];
    let fields = [];

    function handleChange(e: React.FormEvent<HTMLSelectElement>): void {
        selectedKey = e.currentTarget.value;
    }

    const changeFields = (fieldName, list) => {
        fields[fieldName] = list;
    }

    const selectField = () => {
        list.push(selectedKey);
        setEditFields(list);
        setRefresh(!refresh);
    }


    return (<>
        <div>
            {editfields.map((item, index) => {
                return (
                    <FieldElement fieldname={item} fields={[]} fieldStruc={mdOtherFields} changeValues={changeFields}/>
                )
            })}
        </div>
        <div className="omdPanel">
            <div className="omdPanelMsg">Add category:</div>
            <div className="omdSelector"><select onChange={handleChange}>
                {keys.map((item, index) => {
                    if (!editfields.includes(item))
                    return (
                        <option value={item} key={index}>{mdOtherFields[item].label}</option>
                    )
                })}
            </select>
            </div>
            <button className="omdBtn" onClick={selectField}>Select</button>
        </div>
    </>)
}

export default OtherMetadata;