import React from "react";
import {API_URL, mdFields} from "../misc/functions";

function UriFieldElement({fieldname, fields, changeValues}: {fieldname: string, fields: object, changeValues: Function}) {
    let fieldValues = [];
    if (fields.hasOwnProperty(fieldname)) {
        fieldValues = fields[fieldname];
    }

    function handleChange(e: React.FormEvent<HTMLInputElement>): void {
        console.log('rob');
    }

    function deleteField(index) {
        console.log('rob');
    }

    function addField() {
        console.log('rob');
    }

    async function check_url(url_type) {
        const urlStruc = {url: url}
        const response = await fetch(API_URL + "check_url", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(urlStruc)
        });
        const json = await response.json();
        if (json.status === 200) {
            set_status_ok(url_type);
        } else {
            set_status_not_ok(url_type);
        }
        console.log(json);
    }

    return (
        <div>
            <h4>{mdFields[fieldname]["label"]}</h4>
            {
                fieldValues.map((item, index) => {
                    const a_id = "a" + index.toString();
                        return (<div><input type="text" id={a_id}  className="author" defaultValue={item} size={40} onChange={handleChange} /><button className="authorBtn" onClick={() => {check_url('endpoint')}}>Check</button><span id="endpoint_ok" className="no_view">&#10003;</span><span id="endpoint_not_ok" className="no_view">X</span></div>);
                })
            }
        </div>
    )
}

export default UriFieldElement;