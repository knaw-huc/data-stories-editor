import React from "react";
import {mdFields} from "../misc/functions";

function AreaFieldElement({fieldname, fields, changeValues}: {fieldname: string, fields: object, changeValues: Function}) {
    let fieldValue = "";
    if (fields.hasOwnProperty(fieldname)) {
        fieldValue = fields[fieldname][0];
    }

    function handleChange(e: React.FormEvent<HTMLInputElement>): void {

    }


    return (
        <div>
            <h4>{mdFields[fieldname]["label"]}</h4>
            <textarea></textarea>
        </div>
    )
}

export default AreaFieldElement;