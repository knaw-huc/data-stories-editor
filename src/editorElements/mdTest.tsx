import React from "react";
import {useState} from "react";
import FieldElement from "./fieldElement";
import FieldGroupElement from "./fieldGroupElement";


function MdTest({block, changeStyle}: { block: object, changeStyle: Function }) {
    const [fields, setFields] = useState(fillFields);
    let buffer = [];

    function changeFields() {
        alert("rob");
    }

    function fillFields() {
        let retObj = [];
        for (let key in block) {
            if (key !== "_comment") {
                retObj[key] = [];
                if (Array.isArray(block[key])) {
                    block[key].map((item) => {
                        retObj[key].push(item["_text"]);
                    });
                } else {
                    retObj[key].push(block[key]["_text"]);
                }
            }
        }
        return retObj;
    }



    return (
        <div>
            <h1>Edit metadata</h1>
            <FieldElement fieldname="dct:title" fields={fields} changeValues={changeFields}/>
            <FieldElement fieldname="dct:creator" fields={fields} changeValues={changeFields}/>
            <FieldGroupElement/>
        </div>
    )

}

export default MdTest;