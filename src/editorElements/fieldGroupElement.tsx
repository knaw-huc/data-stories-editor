import React from "react";
import {useState, useEffect} from "react";

function FieldGroupElement({label, blockName}: {label: string, blockName: string}) {
    const [collapse, setCollapse] = useState(true);

    useEffect(() => {
        if (collapse) {
            document.getElementById(blockName).style.display = "none";
        } else {
            document.getElementById(blockName).style.display = "block";
        }
    }, [collapse]);
    return (
        <div>
            <div className="field_group_header" onClick={() => {
                setCollapse(!collapse);
            }}>
                {!collapse ? (<span className="group_header_collapser">&#9660;</span>) : (
                    <span className="group_header_collapser">&#9658;</span>)}
                {label}
            </div>
        </div>
    )
}

export default FieldGroupElement;