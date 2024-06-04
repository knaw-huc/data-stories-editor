import React from "react";
import {useState} from "react";
import {provenanceFields} from '../misc/functions';
import FieldGroupElement from "./fieldGroupElement";
import FieldElement from "./fieldElement";


export default function ProvenanceElement({setEditorStatus}: {setEditorStatus: Function}) {
    const [provValues, setProvValues] = useState([]);
    const [refresh, setRefresh] = useState(true);
    const provKeys = Object.keys(provenanceFields);
    let fields = [];



    const changeFields = (fieldName, list) => {
        fields[fieldName] = list;
    }

    return (
        <div>
            <h1>Provenance current block</h1>
            <div style={{margin: 20}}>
                {provKeys.map((key) => {
                    return (
                        <FieldElement fieldname={key} fields={[]} fieldStruc={provenanceFields} changeValues={changeFields}/>
                    )
                })}
            </div>
            <div>
                <button className="editorPanelBtn" onClick={() => {setEditorStatus("data")}}>Save</button>
                <button className="editorPanelBtn" onClick={() => {setEditorStatus("data")}}>Dismiss</button>
            </div>
        </div>
    )
}