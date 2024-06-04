import React from "react";

function AreaFieldElement({fieldname, fields, fieldStruc, changeValues}: {fieldname: string, fields: object, fieldStruc: object, changeValues: Function}) {
    let fieldValue = "";
    if (fields.hasOwnProperty(fieldname)) {
        fieldValue = fields[fieldname][0];
    }

    function handleChange(e: React.FormEvent<HTMLInputElement>): void {

    }
    return (
        <div>
            <h4>{fieldStruc[fieldname]["label"]}</h4>
            <textarea></textarea>
        </div>
    )
}

export default AreaFieldElement;