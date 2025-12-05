import React from "react";
import {fillFields, mdFields} from "../misc/functions";
import FieldElement from "./fieldElement";
import FieldGroupElement from "./fieldGroupElement";
import AreaFieldElement from "./areaFieldElement";
import UriFieldElement from "./uriFieldElement";
import OtherMetadata from "./otherMetadata";

export default function MetadataElement({setEditorStatus, metadata}: {setEditorStatus: Function, metadata: object}) {
    let fields = fillFields(metadata);
    let block = [];

    const changeFields = (fieldName, list) => {
        fields[fieldName] = list;
    }

    const addOtherField = (otherFieldName) => {
        const fieldStruc = <FieldElement fieldname={otherFieldName} fields={fields} fieldStruc={mdFields} changeValues={changeFields}/>;

    }

    return (
        <div className="md_editor">
            <h1>Edit metadata</h1>
            <div className="mdSaveBtn">
                <button onClick={() => {
                    setEditorStatus('data');
                }}>Save metadata
                </button>
                <button onClick={() => {
                    setEditorStatus('data');
                }}>Dismiss
                </button>

            </div>
            <FieldElement fieldname="dct:title" fields={fields} fieldStruc={mdFields} changeValues={changeFields}/>
            <FieldElement fieldname="dct:creator" fields={fields} fieldStruc={mdFields} changeValues={changeFields}/>
            <FieldGroupElement label="Content" blockName="contentBlock"/>
            <div id="contentBlock">
                <FieldElement fieldname="dct:subject" fields={fields} fieldStruc={mdFields} changeValues={changeFields}/>
                <AreaFieldElement fieldname="dct:abstract" fields={fields} fieldStruc={mdFields} changeValues={changeFields}/>
                <AreaFieldElement fieldname="dct:description" fields={fields} fieldStruc={mdFields} changeValues={changeFields}/>
                <AreaFieldElement fieldname="dct:tableOfContents" fields={fields} fieldStruc={mdFields} changeValues={changeFields}/>
            </div>
            <FieldGroupElement label="Actors" blockName="actorBlock"/>
            <div id="actorBlock">
                <FieldElement fieldname="dct:contributor" fields={fields} fieldStruc={mdFields} changeValues={changeFields}/>
                <FieldElement fieldname="dct:publisher" fields={fields} fieldStruc={mdFields} changeValues={changeFields}/>
            </div>
            <FieldGroupElement label="URI's" blockName="uriBlock"/>
            <div id="uriBlock">
                <UriFieldElement fieldname={"ds:Endpoint"} fields={fields} fieldStruc={mdFields} changeValues={changeFields} id="endpoint"/>
                <UriFieldElement fieldname={"ds:LandingPage"} fields={fields} fieldStruc={mdFields} changeValues={changeFields} id="landing"/>
            </div>
            <FieldGroupElement label="Other metadata" blockName="otherBlock"/>
            <div id="otherBlock">
                <OtherMetadata metadata={block}/>
            </div>
        </div>
    )
}