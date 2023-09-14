import React from 'react';
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import icon_arrowDown from '../assets/img/icons/icon-arrow-down.svg';
import icon_arrowUp from '../assets/img/icons/icon-arrow-up.svg';
import icon_edit from '../assets/img/icons/icon-edit.svg';
import icon_delete from '../assets/img/icons/icon-delete.svg';
import ImageElement from "../editorElements/imageElement";
import MarkdownElement from "../editorElements/markdownElement";
import SparqlElement from "../editorElements/sparqlElement";
import {API_URL} from "../misc/functions";
// import MetaDataElement from "../editorElements/metaDataElement";
import MdTest from "../editorElements/mdTest";


function DsEditor({
                      uuid,
                      currentEditBlock,
                      dataStoryData,
                      setDataStoryData,
                      setEditorStatus,
                      setCurrentEditBlock,
                      editorStatus,
                      showOpenDialog,
                      setShowOpenDialog
                  }: {
    uuid: string
    currentEditBlock: object,
    dataStoryData: object,
    setDataStoryData: Function,
    setEditorStatus: Function,
    setCurrentEditBlock: Function,
    editorStatus: boolean,
    showOpenDialog: boolean,
    setShowOpenDialog: Function
}) {

    let hasId = false
    if (currentEditBlock['block_id'] != '') {
        hasId = true
    }

    const navigate = useNavigate();
    const [style, setStyle] = useState("panel_edit fixedBottom editorDown");
    const [textFieldHeader, setTextFieldHeader] = useState<string>("");
    const [textFieldContent, setTextFieldContent] = useState<string>("");
    const [textFieldImgHref, setTextFieldImgHref] = useState<string>("");
    const [textFieldImgCaption, setTextFieldImgCaption] = useState<string>("");
    const [selectMetadaType, setSelectMetadaType] = useState<string>("");
    const [textFieldMetadaVal, setTextFieldMetadaVal] = useState<string>("");
    const [selectProvType, setSelectProvType] = useState<string>("");
    const [textFieldProveVal, setTextFieldProveVal] = useState<string>("");
    const [mimeType, setMimeType] = useState("");
    const [block, setBlock] = useState<Object>({});
    const [writing, setWriting] = useState(false);

    //const blockIndex = findBlockById(currentEditBlock["block_id"]);

    function handleFieldTextChange(e: React.FormEvent<HTMLTextAreaElement>): void {
        setTextFieldContent(e.currentTarget.value);
    }

    function handleFieldHeaderChange(e: React.FormEvent<HTMLTextAreaElement>): void {
        setTextFieldHeader(e.currentTarget.value);
    }

    function handleFieldHrefChange(e: React.FormEvent<HTMLTextAreaElement>): void {
        setTextFieldImgHref(e.currentTarget.value);
    }

    function handleFieldCaptionChange(e: React.FormEvent<HTMLTextAreaElement>): void {
        setTextFieldImgCaption(e.currentTarget.value);
    }

    function handleMetadatValChange(e: React.FormEvent<HTMLInputElement>): void {
        setTextFieldMetadaVal(e.currentTarget.value);
    }

    function handleMetadaTypeChange(e: React.FormEvent<HTMLSelectElement>): void {
        setSelectMetadaType(e.currentTarget.value);
    }

    function handleProvValChange(e: React.FormEvent<HTMLInputElement>): void {
        setTextFieldProveVal(e.currentTarget.value);
    }

    function handleProvTypeChange(e: React.FormEvent<HTMLSelectElement>): void {
        setSelectProvType(e.currentTarget.value);
    }


    function findBlockById(currentBlock) {
        const allBlocks = dataStoryData['ds:DataStory']['ds:Story']['ds:Block']

        var out;
        for (var i = 0; i < allBlocks.length; i++) {
            if (allBlocks[i]['_attributes']["xml:id"] === currentBlock) {
                out = i;
            }
        }
        return out;
    }


    // edit panel up and down
    //console.log('editorStatus', editorStatus);

    const changeStyle = () => {
        if (editorStatus) {
            setStyle("panel_edit fixedBottom editorUp");
            setEditorStatus(false);
        } else {
            setStyle("panel_edit fixedBottom editorDown");
            setEditorStatus(true);
        }


    };


    // if has block id get data from datastory
    function setFields() {
        if (currentEditBlock['block_id'] !== '' && currentEditBlock['block_id'] !== 'metadata') {
            let headingFieldContent = ''
            let textFieldContentImp = ''
            let textFieldhrefImp = ''
            let textFieldCaptionImg = ''
            let mime = ''
            let editableBlock = {}

            const allBlocks = dataStoryData['ds:DataStory']['ds:Story']['ds:Block']

            // get header data
            if (allBlocks[findBlockById(currentEditBlock['block_id'])]['ds:Metadata'] !== undefined) {
                headingFieldContent = allBlocks[findBlockById(currentEditBlock['block_id'])]['ds:Metadata']['dct:title']._text
            }

            // get content data
            if (allBlocks[findBlockById(currentEditBlock['block_id'])] !== undefined) {
                textFieldContentImp = allBlocks[findBlockById(currentEditBlock['block_id'])]._text
            }

            if (allBlocks[findBlockById(currentEditBlock['block_id'])]['_attributes']['mime'] === 'image/*') {
                // get href data
                if (allBlocks[findBlockById(currentEditBlock['block_id'])] !== undefined) {
                    textFieldhrefImp = allBlocks[findBlockById(currentEditBlock['block_id'])]['_attributes']['href']
                }

                // get caption data
                if (allBlocks[findBlockById(currentEditBlock['block_id'])] !== undefined) {
                    textFieldCaptionImg = allBlocks[findBlockById(currentEditBlock['block_id'])]['ds:Metadata']['dct:title']._text
                }
            }

            // Get mimetype
            if (allBlocks[findBlockById(currentEditBlock['block_id'])] !== undefined) {
                mime = allBlocks[findBlockById(currentEditBlock['block_id'])]['_attributes']['mime'];
            }

            //Get complete block
            if (allBlocks[findBlockById(currentEditBlock['block_id'])] !== undefined) {
                editableBlock = allBlocks[findBlockById(currentEditBlock['block_id'])];
            }


            //console.log(allBlocks[findBlockById(currentEditBlock['block_id'])]);
            setTextFieldContent(textFieldContentImp)
            setTextFieldHeader(headingFieldContent)
            setTextFieldImgHref(textFieldhrefImp)
            setTextFieldImgCaption(textFieldCaptionImg)
            setMimeType(mime);
            setBlock(editableBlock);
        } else {
            if (currentEditBlock['block_id'] === 'metadata') {
                setMimeType('metadata');
            }
        }
    }


    const updateBlock = () => {

        const newState = dataStoryData['ds:DataStory']['ds:Story']['ds:Block'].map(obj => {
            if (obj['_attributes']['xml:id'] === currentEditBlock['block_id']) {


                let mutatedObj = {}
                if (obj['_attributes']['mime'] === 'image/*') {
                    mutatedObj = {
                        ...obj,
                        '_attributes': {
                            'href': textFieldImgHref,
                            'type': 'media',
                            'mime': 'image/*',
                            'xml:id': obj['_attributes']['xml:id']
                        },
                        'ds:Metadata': {'dct:title': {'_text': textFieldHeader}}
                    };
                } else {
                    mutatedObj = {
                        ...obj,
                        "_text": textFieldContent,
                        'ds:Metadata': {'dct:title': {'_text': textFieldHeader}}
                    };
                }

                return mutatedObj;

            }
            return obj;
        })

        let newDatastory = dataStoryData;
        newDatastory['ds:DataStory']['ds:Story']['ds:Block'] = newState;

        setDataStoryData(newDatastory);
        setEditorStatus(true)
        //console.log(newDatastory);


    };

    // submenu interface
    /*const editerBlockSubContent = (sub) => {
      console.log('editerBlockSub', sub)
      document.getElementById('sub_content').style.display = 'none';
      document.getElementById('sub_metadata').style.display = 'none';
      document.getElementById('sub_notes').style.display = 'none';
      document.getElementById('sub_provenance').style.display = 'none';

      document.getElementById('sub_image').style.display = 'none';

      if (sub === 'content') {
        document.getElementById('sub_content').style.display = 'block';
      }
      if (sub === 'metadata') {
        document.getElementById('sub_metadata').style.display = 'block';
      }
      if (sub === 'notes') {
        document.getElementById('sub_notes').style.display = 'block';
      }
      if (sub === 'provenance') {
        document.getElementById('sub_provenance').style.display = 'block';
      }
      if (sub === 'image') {
        document.getElementById('sub_image').style.display = 'block';
      }
    }*/

    function exportStory() {
        const preXml = '<?xml version="1.0" encoding="UTF-8"?>\n<?xml-model href="schema/datastory.rng" type="application/xml" schematypens="http://relaxng.org/ns/structure/1.0"?>\n'

        //console.log(preXml + loopThrough(dataStoryData, ''))

        function loopThrough(arr, objName) {
            let out = '';

            if (typeof arr === 'object') {
                Object.keys(arr).map(function (keyName, keyIndex) {


                    if (typeof arr[keyName] === 'object') {
                        // if not attribute ((keyName !== '_attributes') || (keyName !== '_declaration') || (keyName !== '_instruction'))
                        if ((keyName === '_attributes') || (keyName === '_declaration') || (keyName === '_instruction')) {
                        } else {
                            let attrStr = '';


                            // if is array
                            if (Array.isArray(arr[keyName])) {
                                arr[keyName].map((x, index) => {
                                    attrStr = get_attributes(x)
                                    out += '<' + keyName + attrStr + '>' + loopThrough(x, '') + '</' + keyName + '>'
                                })

                            } else { // if is object with objects
                                let tagName = keyName
                                attrStr = get_attributes(arr[keyName])
                                if (objName !== '') {
                                    tagName = objName
                                }
                                out += '<' + tagName + attrStr + '>' + loopThrough(arr[keyName], '') + '</' + tagName + '>'
                            }

                        }


                    } else {
                        // if is object, with one value
                        if (keyName === '_text') {
                            out += arr[keyName]
                        } else if (keyName === '_cdata') {
                            out += '<![CDATA[' + arr[keyName] + ']]>'
                        } else {
                            out += '<' + keyName + '>' + escapeHtml(arr[keyName]) + '</' + keyName + '>'
                        }


                    }
                })
            }

            out = out.replaceAll('<_comment>', '<!-- ');
            out = out.replaceAll('</_comment>', ' -->');

            return out
        }
    }

    function get_attributes(obj) {
        let out = ''
        if (obj['_attributes'] !== undefined) {
            //attrStr = ''
            Object.keys(obj['_attributes']).map(function (keyName2) {
                out += ' ' + keyName2 + '="' + obj['_attributes'][keyName2] + '"'
            })
        }
        return out;
    }

    function escapeHtml(unsafe) {
        return unsafe
            .replaceAll(/&/g, "&amp;")
            .replaceAll(/</g, "&lt;")
            .replaceAll(/>/g, "&gt;")
            .replaceAll(/"/g, "&quot;")
            .replaceAll(/'/g, "&#039;");
    }


    useEffect(() => {
        setFields()
        changeStyle()
        //editerBlockSubContent('content')

    }, [dataStoryData, currentEditBlock]);


    const Listdata = ({list}) => {
        let newList = list
        if (list === undefined) {
            newList = {}
        }

        return (
            <ul>
                {Object.keys(newList).map(keyName => (
                    <li key={keyName}>
                        <div className="editList__text"><span
                            className="hc_text--S">{keyName}</span><br/>{newList[keyName]['_text']}</div>
                        <div className="editList__button">
                            <button type="button" name="button" className="bt_icon block_event">
                                <img src={icon_edit} alt=""/>
                            </button>
                        </div>
                        <div className="editList__button">
                            <button type="button" name="button" className="bt_icon block_event">
                                <img src={icon_delete} alt=""/>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        )
    }


    function addMetdata() {
        //dataStoryData['ds:DataStory']['ds:Story']['ds:Block'][findBlockById(currentEditBlock['block_id'])]["ds:Metadata"]

        let metadataNew = dataStoryData['ds:DataStory']['ds:Story']['ds:Block'][findBlockById(currentEditBlock['block_id'])]["ds:Metadata"];
        let mutatedObj = {}
        mutatedObj = {...metadataNew, [selectMetadaType]: {'_text': textFieldMetadaVal}};

        let newDatastory = dataStoryData;
        newDatastory['ds:DataStory']['ds:Story']['ds:Block'][findBlockById(currentEditBlock['block_id'])]["ds:Metadata"] = mutatedObj;

        setDataStoryData(newDatastory);
        setEditorStatus(true)

    }

    async function saveStory() {
        const ds = {
            datastory_id: uuid,
            datastory_title: dataStoryData['ds:DataStory']['ds:Metadata']['dct:title']['_text'],
            datastory: dataStoryData
        }
        setWriting(true);
        const response = await fetch(API_URL + 'update_datastory', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ds)
        });

        const json = await response.json();
        if (json.status === 'OK') {
            setWriting(false);
        }


    }

    function addProv() {
        let provObj = dataStoryData['ds:DataStory']['ds:Story']['ds:Block'][findBlockById(currentEditBlock['block_id'])]["ds:Provenance"]
        //console.log(dataStoryData['ds:DataStory']['ds:Story']['ds:Block'][findBlockById(currentEditBlock['block_id'])])
        if (provObj === undefined) {
            //console.log('no prov1')
            // dataStoryData['ds:DataStory']['ds:Story']['ds:Block'][findBlockById(currentEditBlock['block_id'])["ds:Provenance"]] = {}
            // console.log('no prov2', dataStoryData['ds:DataStory']['ds:Story']['ds:Block'][findBlockById(currentEditBlock['block_id'])])

            let metadataNew = dataStoryData['ds:DataStory']['ds:Story']['ds:Block'][findBlockById(currentEditBlock['block_id'])];
            let mutatedObj = {}
            mutatedObj = {...metadataNew, "ds:Provenance": {[selectProvType]: {'_text': textFieldProveVal}}};

            let newDatastory = dataStoryData;
            newDatastory['ds:DataStory']['ds:Story']['ds:Block'][findBlockById(currentEditBlock['block_id'])] = mutatedObj;

            setDataStoryData(newDatastory);
            setEditorStatus(true)
        }
    }

    function setDialogOpen() {
        setShowOpenDialog(!showOpenDialog);
    }

    return (

        <div className={style} id="panel_edit">


            <div className="edit_header">
                <div className="panel_edit_wrap panel_edit__split">
                    <div><strong>Editor</strong></div>
                    <div
                        style={{display: 'flex', flexDirection: 'row'}}>
                        {writing && <div className="writeMsg">Writing data story...</div>}
                        <button onClick={() => {
                            saveStory()
                        }}>Save story
                        </button>
                        <button type="button" onClick={exportStory} className="">Export story</button>
                        <button onClick={() => {
                            navigate("/")
                        }}>Close story
                        </button>
                        <button type="button" onClick={changeStyle} className="bt_icon">
                            {editorStatus ? (<img src={icon_arrowDown} alt=""/>) : (<img src={icon_arrowUp} alt=""/>)}

                        </button>

                    </div>

                </div>
            </div>

            <div className="panel_edit_inner panel_edit_wrap">


                <div className="edit_body">
                    {!block.hasOwnProperty("_attributes") && mimeType !== 'metadata' && <div><strong>No block selected</strong></div>}
                    {mimeType === "metadata" && <MdTest block={dataStoryData["ds:DataStory"]["ds:Metadata"]} changeStyle={changeStyle}/>}
                    {mimeType === "image/*" && <ImageElement block={block} changeStyle={changeStyle}/>}
                    {mimeType === "text/markdown" && <MarkdownElement block={block} changeStyle={changeStyle}/>}
                    {mimeType === "application/sparql-query" && <SparqlElement/>}
                </div>


            </div>
        </div>

    )
}

export default DsEditor;
