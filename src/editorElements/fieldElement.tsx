import React from "react";
import {useState} from "react";

function FieldElement({fieldname, fields, fieldStruc, changeValues}: {fieldname: string, fields: object, fieldStruc: object, changeValues: Function}) {
    const [refresh, setRefresh] = useState(true);
    const [values, setValues] = useState(fieldList);


    function fieldList() {
        let fieldValues = [];
        if (fields.hasOwnProperty(fieldname)) {
            fieldValues = fields[fieldname];
        } else {
            fieldValues.push('');
        }
        return fieldValues;
    }


    function handleChange(e: React.FormEvent<HTMLInputElement>): void {
        let fieldValues = values;
        fieldValues[e.currentTarget.id] = e.currentTarget.value;
        setValues(fieldValues);
        changeValues(fieldname, fieldValues);
    }

    function deleteField(index) {
        let fieldValues = values;
        fieldValues.splice(index, 1);
        //changeValues(fieldname, fields);
        setValues(fieldValues);
        setRefresh(!refresh);
    }

    function addField() {
        let fieldValues = values;
        fieldValues.push('');
        //changeValues(fieldname, fields);
        setValues(fieldValues);
        setRefresh(!refresh);
    }


    return (
        <div>
            <h4>{fieldStruc[fieldname]["label"]}</h4>
            {
                values.map((item, index) => {
                    const a_id =  index.toString();
                    if (index === 0) {
                        return (<div key={index}><input type="text" id={a_id}  defaultValue={item} size={40} onChange={handleChange} /><button className="authorBtn" onClick={addField}>+</button></div>);}
                    else {
                        return (<div key={index}><input type="text" id={a_id} defaultValue={item} size={40} onChange={handleChange} /><button className="authorBtn" onClick={() => {deleteField(index)}}>-</button></div>);
                    }
                })
            }
        </div>
    )
}

export default FieldElement;