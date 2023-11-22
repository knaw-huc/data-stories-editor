import React from "react";
import {mdFields} from "../misc/functions";

function FieldElement({fieldname, fields, changeValues}: {fieldname: string, fields: object, changeValues: Function}) {
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
        console.log('rob');
    }

    function addField() {
        console.log('rob');
    }

    return (
        <div>
            <h4>{mdFields[fieldname]["label"]}</h4>
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