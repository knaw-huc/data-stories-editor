import React from "react";
import {useState} from "react";
import {provenanceFields, fillFields, textFields} from '../misc/functions';
import FieldGroupElement from "./fieldGroupElement";
import FieldElement from "./fieldElement";


export default function ProvenanceElement({provenanceBlock, setP, setEditorStatus}: {provenanceBlock: object, setP: Function, setEditorStatus: Function}) {
    const [provValues, setProvValues] = useState(provenanceBlock);
    //const [refresh, setRefresh] = useState(true);
    const provKeys = Object.keys(provenanceFields);
    const [fields, setFields] = useState(fillFields(provenanceBlock));


    const changeFields = (fieldName, list) => {
        let tmpFields = fields;
        tmpFields[fieldName] = list;
        setFields(tmpFields);
    }

    function saveProv() {
        const prov = textFields(fields);
        setP(prov);
        setEditorStatus("data");
    }


    return (
        <div>
            <h1>Provenance current block</h1>
            <div style={{margin: 20}}>
                {provKeys.map((key) => {
                    //if (provenanceBlock[key] === undefined)
                    //{
                    //return (
                        //<FieldElement fieldname={key} fields={[]} fieldStruc={provenanceFields} changeValues={changeFields}/>
                    //)} else {
                        return (
                        <FieldElement fieldname={key} fields={fields} fieldStruc={provenanceFields} changeValues={changeFields}/>
                        )
                    //}
                })}
            </div>
            <div>
                <button className="editorPanelBtn" onClick={() => {saveProv()}}>Save</button>
                <button className="editorPanelBtn" onClick={() => {setEditorStatus("data")}}>Dismiss</button>
            </div>
        </div>
    )
}