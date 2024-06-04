import React from "react";
import {useState} from "react";
import {API_URL} from "../misc/functions";

function UriFieldElement({
                             fieldname,
                             fields,
                            fieldStruc,
                             changeValues,
                             id
                         }: { fieldname: string, fields: object, fieldStruc: object, changeValues: Function, id: string }) {
    let fieldValues = [];
    if (fields.hasOwnProperty(fieldname)) {
        fieldValues = fields[fieldname];
    } else {
        fieldValues.push("");
    }

    function handleChange(e: React.FormEvent<HTMLInputElement>): void {
        reset_status();
        fieldValues[0] = (e.currentTarget.value);
        changeValues(fieldname, fieldValues);
    }

    function set_status_ok() {
        document.getElementById(id + "_ok").classList.remove("no_view");
    }

    function set_status_not_ok() {
        document.getElementById(id + "_not_ok").classList.remove("no_view");
    }

    function reset_status() {
        document.getElementById(id + "_ok").classList.add("no_view");
        document.getElementById(id + "_not_ok").classList.add("no_view");
    }


    async function check_url() {
        const urlStruc = {url: fieldValues[0]}
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
            set_status_ok();
        } else {
            set_status_not_ok();
        }
    }

    const ok = id + "_ok";
    const not_ok = id + "_not_ok";

    return (
        <div>
            <h4>{fieldStruc[fieldname]["label"]}</h4>
            <div><input type="text" id={id} className="author" defaultValue={fieldValues[0]} size={40}
                                                    onChange={handleChange}/>
                        <button className="authorBtn" onClick={() => {
                            check_url()
                        }}>Check
                        </button>
                        <span id={ok} className="no_view">&#10003;</span><span id={not_ok} className="no_view">X</span>
                    </div>
        </div>
    )
}

export default UriFieldElement;