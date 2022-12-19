import React from 'react';
import {useState} from "react";
import icon_arrowDown from '../assets/img/icons/icon-arrow-down.svg';


function DsEditor({all, curr, dataStoryData, setDataStoryData}: {all: object, curr:String, dataStoryData: object, setDataStoryData: Function} ) {
  const [style, setStyle] = useState("panel_edit fixedBottom editorDown");
  const [editorUp, setEditorUp] = useState(true);

  const [fieldText, setFieldText] = useState('');



 const changeStyle = () => {
   if (editorUp) {
     setStyle("panel_edit fixedBottom editorUp");
     setEditorUp(false);
   } else {
     setStyle("panel_edit fixedBottom editorDown");
     setEditorUp(true);
   }

   //setStyle("panel_edit fixedBottom editorUp");
 };



 if (curr!= '') {
   let headingFieldContent = ''
   let textFieldContent = ''

   const allBlocks = dataStoryData['ds:DataStory']['ds:Story']['ds:Block']
   //console.log('editor1', curr)
   //console.log('editor2',findBlockById(curr))

   if (allBlocks[findBlockById(curr)]['ds:Metadata'] !== undefined) {
     headingFieldContent = allBlocks[findBlockById(curr)]['ds:Metadata']['dct:title']._text
     //console.log('editor3', headingFieldContent)
   }

   if (allBlocks[findBlockById(curr)] !== undefined) {
     textFieldContent = allBlocks[findBlockById(curr)]._text
     //console.log('editor3', textFieldContent)

   }

   document.getElementById('headingField').innerHTML = headingFieldContent
   document.getElementById('textField').innerHTML = textFieldContent
   //setFieldText(textFieldContent)

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
  console.log('update', fieldText)
};



// const handleFieldTextChange = event => {
//     setFieldText(event.target.value);
//     console.log(event.target.value);
//   };

    return (

      <div className={style} id="panel_edit">

        <div className="edit_header">
          <div className="panel_edit_wrap panel_edit__split">
            <div><strong>Edit markdown block</strong></div>
            <button type="button" onClick={changeStyle} className="bt_icon">
                <img src={icon_arrowDown} alt="" />
            </button>
          </div>
        </div>

        <div className="panel_edit_inner panel_edit_wrap">


        <div className="edit_body">
          <div className="edit_segments">

            <a href="/">Text</a>
            <a href="/">Metadata</a>
            <a href="/">Notes and Comments</a>
            <a href="/">Provenance</a>
            <a href="/">Layout</a>
          </div>
          <div className="edit_workspace">

            <label htmlFor="heading">Heading</label>
            <textarea
            name="heading"
            id="headingField"
            className="smallEditField"


            ></textarea>
            <label htmlFor="tb">Text block</label>
            <textarea
              name="tb"
              id="textField"


            ></textarea>
            <button onClick={updateBlock}>Update</button>
          </div>

        </div>


        </div>
      </div>

    )
}

export default DsEditor;

// This datastory uses Dutch death certificates from 1910-20 to map the temporal, spatial and social distribution of the 'Spanish' flu epidemic that hit The Netherlands in 1918-19.
//
// ## I. The dataset
//
// Thanks to the indexation efforts of archives and the LINKS project, large parts of the Dutch civil registry ('Burgerlijke Stand') are now becoming available for historians. The death certificates used here are retrieved from openarch.nl (available here). From the individual death certificates files per archive, one combined dataset was created. One challenge of working with these certificates is that that the same certificate may have been indexed by more than one archive.
//
// The table below demonstrates the success of the standardization efforts, presented as Linked Data.
