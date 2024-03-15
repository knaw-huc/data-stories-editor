import React, {ReactElement} from 'react';
import {useState, useEffect} from "react";
import icon_plus from '../assets/img/icons/icon-+.svg';


function StoryBlockNew({prevId, dataStoryData, setCurrentEditBlock, setDataStoryData}: {
    prevId: String,
    dataStoryData: object,
    setCurrentEditBlock: Function,
    setDataStoryData: Function
}): ReactElement {

    const [blockHeight, setBlockHeight] = useState({height: "0px"});
    const newId = uniqueGenerator()
    const newType = uniqueGenerator()
    const newMime = uniqueGenerator()

    const newEntryMD = {
        "_attributes": {
            "xml:id": newId,
            "type": "text",
            "mime": "text/markdown"
        },
        "_comment": "",
        "ds:Metadata": {
            "dct:title": {
                "_text": ""
            },
            "_comment": ""
        },
        "ds:Cues": {
            "_comment": [],
            "ds:title-prologue": {
                "_attributes": {
                    "type": "template"
                },
                "_text": "# I. {$ds-Block/dct:title}"
            }
        },
        "_text": ""
    }

    const newEntryIm = {
        "_attributes": {
            "xml:id": newId,
            "type": "media",
            "mime": "image/*",
            "href": "https://via.placeholder.com/900x360/d9dbe4/9098bd?text=image_placeholder"
        },
        "_comment": "",
        "ds:Metadata": {
            "dct:title": {
                "_text": ""
            },
            "_comment": ""
        }
    }

    const newEntryHtmlRef = {
        "_attributes": {
            "xml:id": newId,
            "type": "media",
            "mime": "text/html",
            "href": ""
        },
        "_comment": "",
        "ds:Metadata": {
            "dct:title": {
                "_text": ""
            },
            "_comment": ""
        }
    }

    const newEntrySparql = {
        "_attributes": {
            "xml:id": newId,
            "type": "query",
            "mime": "application/sparql-query"
        }
    }


    function openNewBlock() {
        setBlockHeight({height: "150px"})
    }

    function closeNewBlock() {
        setBlockHeight({height: "0px"})
    }

    function addNew(newType) {

        let jsonTemplate = {}
        jsonTemplate = newEntryMD;
        if (newType === 'image') {
            jsonTemplate = newEntryIm;
        }
        if (newType === 'sparql') {
            jsonTemplate = newEntrySparql;
        }
        if (newType === 'frame') {
            jsonTemplate = newEntryHtmlRef;
        }


        let foundedIndex = -1;
        dataStoryData["ds:DataStory"]["ds:Story"]["ds:Block"].map((obj, index) => {
            if (obj["_attributes"]["xml:id"] === prevId) {
                foundedIndex = index
            }

        });


        dataStoryData["ds:DataStory"]["ds:Story"]["ds:Block"].splice(foundedIndex + 1, 0, jsonTemplate)
        setDataStoryData(dataStoryData)
        closeNewBlock()
        setCurrentEditBlock({block_id: newId})
    }

    function uniqueGenerator() {
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4());
    }


    useEffect(() => {


    }, [dataStoryData]);


    return (

        <div className="dsBlock dsBlock__layout dsBlock__new">
            <div className=" dsBlock__left">
                <button type="button" name="button" className="bt_icon newBlockHandler" onClick={openNewBlock}>
                    <img src={icon_plus} alt=""/>
                </button>
            </div>
            <div className="dsBlock__right newMenu" style={blockHeight}>
                <div>

                    <strong>Text</strong>
                    <div>
                        <button className="newBlockOptionBtn" onClick={() => addNew('markdown')}>Markdown</button>
                    </div>
                </div>

                <div>
                    <strong>Media</strong>
                    <div>
                        <button className="newBlockOptionBtn" onClick={() => addNew('image')}>Image</button>
                    </div>
                    <div>
                        <button className="newBlockOptionBtn" onClick={() => addNew('frame')}>Frame</button>
                    </div>
                </div>

                <div>
                    <strong>Query</strong>
                    <div>
                        <button className="newBlockOptionBtn" onClick={() => addNew('sparql')}>SPARQL</button>
                    </div>
                </div>

                <div>
                    <div>
                        <button onClick={closeNewBlock}>X</button>
                    </div>
                </div>
            </div>
        </div>

    )
}


export default StoryBlockNew;
