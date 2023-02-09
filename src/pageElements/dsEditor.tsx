import React from 'react';
import {useState, useEffect} from "react";
import icon_arrowDown from '../assets/img/icons/icon-arrow-down.svg';
import convert from 'xml-js';
import { Buffer } from 'buffer';
import { log } from 'console';

function DsEditor({currentEditBlock, dataStoryData, setDataStoryData, setEditorStatus, setCurrentEditBlock, editorStatus}: {

  currentEditBlock:object, 
  dataStoryData: object, 
  setDataStoryData: Function,
  setEditorStatus: Function,
  setCurrentEditBlock: Function,
  editorStatus: boolean} ) {

  //console.log(dataStoryData);
  
  
  const [style, setStyle] = useState("panel_edit fixedBottom editorDown");
  const [textFieldHeader, setTextFieldHeader] = useState<string>("");
  const [textFieldContent, setTextFieldContent] = useState<string>("");
  const [textFieldImgHref, setTextFieldImgHref] = useState<string>("");
  const [textFieldImgCaption, setTextFieldImgCaption] = useState<string>("");


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


// edit panel up and down
console.log('editorStatus',editorStatus);

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
  if (currentEditBlock['block_id'] != '') {
    let headingFieldContent = ''
    let textFieldContentImp = ''
    let textFieldhrefImp = ''
    let textFieldCaptionImg = ''

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
  

    //console.log('update by set block id',textFieldContentImp)
    setTextFieldContent(textFieldContentImp)
    setTextFieldHeader(headingFieldContent)
    setTextFieldImgHref(textFieldhrefImp)
    setTextFieldImgCaption(textFieldCaptionImg)

    

  }
}



function findBlockById(id) {
const allBlocks = dataStoryData['ds:DataStory']['ds:Story']['ds:Block']

  var out;
  for (var i = 0; i < allBlocks.length; i++){
    if (allBlocks[i]['_attributes']["xml:id"] == id){
      out = i;
    }
}
return out;
}


    


const updateBlock = () => {
  
  const newState = dataStoryData['ds:DataStory']['ds:Story']['ds:Block'].map(obj => {
    if (obj['_attributes']['xml:id'] === currentEditBlock['block_id']) {
      console.log('****', obj['_attributes']['mime']);
      
      
      let mutatedObj = {}
      if (obj['_attributes']['mime'] === 'image/*') {
        mutatedObj = {...obj, '_attributes': {'href':  textFieldImgHref, 'type': 'media', 'mime': 'image/*', 'xml:id':obj['_attributes']['xml:id']}, 'ds:Metadata': {'dct:title': {'_text':textFieldHeader}} };
      } else {
        mutatedObj = {...obj, "_text": textFieldContent, 'ds:Metadata': {'dct:title': {'_text':textFieldHeader}} };
      }

      return mutatedObj;
      
    }
    return obj;
  })

  let newDatastory = dataStoryData;
  newDatastory['ds:DataStory']['ds:Story']['ds:Block'] =  newState;

  setDataStoryData(newDatastory);
  setEditorStatus(true)
  console.log(newDatastory);
  
  
};

// submenu interface
const editerBlockSubContent = (sub) => {
  console.log('editerBlockSub', sub)
  document.getElementById('sub_content').style.display='none';
  document.getElementById('sub_metadata').style.display='none';
  document.getElementById('sub_notes').style.display='none';
  document.getElementById('sub_provenance').style.display='none';

  document.getElementById('sub_image').style.display='none';

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
}

function exportStory() {

  console.log("<xml>"+loopThrough(dataStoryData, '')+"</xml>")

  function loopThrough(arr, objName) {
    let out = '';

    if (typeof arr === 'object') {
      Object.keys(arr).map(function(keyName, keyIndex) {

        
        if (typeof arr[keyName] === 'object') {
          // if not attribute
          if (arr[keyName] !== '_attributes') {
            let attrStr = '';
            // if has attributes
            if (arr[keyName]['_attributes'] !== undefined) {
              attrStr = ''
              Object.keys(arr[keyName]['_attributes']).map(function(keyName2) {
                attrStr += keyName2+'="'+arr[keyName]['_attributes'][keyName2]+'" '
              })
              console.log('>>',arr[keyName]['_attributes'])
            }


            out += '<'+keyName+' '+attrStr+' >'+loopThrough(arr[keyName], '')+'</'+keyName+'>'
 
          }
          
          
        } else {
          console.log('other', keyName, ', val:', arr[keyName]);
          if( keyName === '_text') {
            out += arr[keyName]
          } else {
            out += '<'+keyName+'>'+arr[keyName]+'</'+keyName+'>'
          }
          
          
          
        }
      })
    }

    // if is array
    if (Array.isArray(arr)) {
      arr.map((x, index) => {
            out += '<arrrrrrrrrrrrrrrrrr>'+loopThrough(x, '')+'</arrrrrrrrrrrrrrrrrr>'
          })

    }


    return out
  }
}                                                                                                                                                                                                                         
                                                                                                                                                                 

useEffect(() => {
    setFields()
    changeStyle()
    editerBlockSubContent('content')
    
}, [dataStoryData,currentEditBlock]);




    return (

      <div className={style} id="panel_edit">

        <div className="edit_header">
          <div className="panel_edit_wrap panel_edit__split">
            <div><strong>Editor</strong></div>
            <div
            style={{display: 'flex', flexDirection: 'row'}}>
            <button type="button" onClick={exportStory} className="">Export story</button>
            <button type="button" onClick={changeStyle} className="bt_icon">
                <img src={icon_arrowDown} alt="" />
            </button>

            </div>

          </div>
        </div>

        <div className="panel_edit_inner panel_edit_wrap">


        <div className="edit_body">
          <div className="edit_segments">

            <a href="#" onClick={() => editerBlockSubContent('content')}>Content</a>
            <a href="#" onClick={() => editerBlockSubContent('metadata')}>Metadata</a>
            <a href="#" onClick={() => editerBlockSubContent('notes')}>Notes and Comments</a>
            <a href="#" onClick={() => editerBlockSubContent('provenance')}>Provenance</a>
            <a href="#" onClick={() => editerBlockSubContent('image')}>Image</a>
            
          </div>
          <div className="edit_workspace">
            <div id='sub_content'>

              <label htmlFor="heading">Heading
              <textarea
              name="heading"
              id="headingField"
              className="smallEditField"
              value={textFieldHeader}
              onChange={handleFieldHeaderChange}
              ></textarea>
              </label>


              <label htmlFor="tb">Markdown text
              <textarea
                name="tb"
                id="textField"
                value={textFieldContent}
                onChange={handleFieldTextChange}


              ></textarea></label>
            </div>

            <div id='sub_metadata'>
              <label htmlFor="tb">Metadata title
              <textarea
                name="tb"
                id="textField"
                className="smallEditField"
              ></textarea></label>
            </div>


            <div id='sub_notes'>
              <label htmlFor="tb">Notes
              <textarea
                name="tb"
                id="textField"
                
              ></textarea></label>
            </div>

            <div id='sub_provenance'>
              <label htmlFor="tb">Provenance
              <textarea
                name="tb"
                id="textField"
                className="smallEditField"
              ></textarea>
              <button >Add provenance</button>
              </label>
            </div>

            <div id='sub_image'>
              <label htmlFor="tb">Image href
              <textarea
                name="image_url"
                className="smallEditField"
                value={textFieldImgHref}
                onChange={handleFieldHrefChange}
              ></textarea>
              </label>

              <label htmlFor="tb">Image caption / Alt text
              <textarea
                name="image_caption"
                className="smallEditField"
                value={textFieldImgCaption}
                onChange={handleFieldCaptionChange}
              ></textarea>
              </label>


            </div>

            <button onClick={updateBlock}>Update</button>
          </div>

        </div>


        </div>
      </div>

    )
}

export default DsEditor;
