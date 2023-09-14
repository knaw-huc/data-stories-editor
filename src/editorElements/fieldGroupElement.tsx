import React from "react";
import {useState} from "react";

function FieldGroupElement() {
    const [collapse, setCollapse] = useState(true)
    return (
        <div>
            <div className="field_group_header" onClick={() => {setCollapse(!collapse)}}>
                {collapse ? (<span className="group_header_collapser">&#9660;</span>) : (
                    <span className="group_header_collapser">&#9658;</span>)}
                URI's
            </div>
        </div>
    )
}

export default FieldGroupElement;