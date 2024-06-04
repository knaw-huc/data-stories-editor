import React from "react";
import {useState} from "react";

function FieldElement({fieldname, fields, fieldStruc, changeValues}: {fieldname: string, fields: object, fieldStruc: object, changeValues: Function}) {
    const [refresh, setRefresh] = useState(true);
    let fieldValues = [];
    if (fields.hasOwnProperty(fieldname)) {
        fieldValues = fields[fieldname];
    } else {
        fieldValues.push("");
    }

    function handleChange(e: React.FormEvent<HTMLInputElement>): void {
        fieldValues[e.currentTarget.id] = e.currentTarget.value;
        changeValues(fieldname, fieldValues);
    }

    function deleteField(index) {
        fieldValues.splice(index, 1);
        setRefresh(!refresh);
    }

    function addField() {
        fieldValues.push("");
        setRefresh(!refresh);
    }

    return (
        <div>
            <h4>{fieldStruc[fieldname]["label"]}</h4>
            {
                fieldValues.map((item, index) => {
                    const a_id =  index.toString();
                    if (index === 0) {
                        return (<div key={index}><input type="text" id={a_id}   defaultValue={item} size={40} onChange={handleChange} /><button className="authorBtn" onClick={addField}>+</button></div>);}
                    else {
                        return (<div key={index}><input type="text" id={a_id} defaultValue={item} size={40} onChange={handleChange} /><button className="authorBtn" onClick={() => {deleteField(index)}}>-</button></div>);
                    }
                })
            }
        </div>
    )
}

export default FieldElement;