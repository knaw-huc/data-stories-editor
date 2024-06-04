import React from "react";
import {useState} from "react";
import FieldElement from "./fieldElement";
import FieldGroupElement from "./fieldGroupElement";
import UriFieldElement from "./uriFieldElement";
import AreaFieldElement from "./areaFieldElement";
import {mdFields} from "../misc/functions";


function MetadataStory({dsData, setDsData, changeStyle}: { dsData: object, setDsData: Function, changeStyle: Function }) {
    let block = dsData["ds:DataStory"]["ds:Metadata"];
    let fields = fillFields();

    const changeFields = (fieldName, list) => {
        fields[fieldName] = list;
    }

    function saveMetadata() {
        let tmpBlock = {}
        for (let key in fields) {
            tmpBlock[key] = [];
            for (let fieldKey in fields[key]) {
                tmpBlock[key].push({"_text": fields[key][fieldKey]});
            }
        }
        block = tmpBlock;
        let tmpData = dsData;
        tmpData["ds:DataStory"]["ds:Metadata"] = block;
        setDsData(tmpData);
        changeStyle();
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
        console.log(retObj);
        return retObj;
    }


    return (
        <div className="md_editor">
            <h1>Edit metadata</h1>
            <div className="mdSaveBtn">
                <button onClick={() => {
                    saveMetadata();
                }}>Save metadata
                </button>
                    <button onClick={() => {
                        changeStyle();
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
            <FieldGroupElement label="Actor" blockName="actorBlock"/>
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
                <div>Other stuff</div>
            </div>
        </div>
    )

}

export default MetadataStory;