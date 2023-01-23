import React from 'react';
import {useState, useEffect} from "react";
import icon_arrowDown from '../assets/img/icons/icon-arrow-down.svg';


function DsEditor({all, currentEditBlock, dataStoryData, setDataStoryData}: {all: object, currentEditBlock:object, dataStoryData: object, setDataStoryData: Function} ) {
  const [style, setStyle] = useState("panel_edit fixedBottom editorDown");
  const [editorUp, setEditorUp] = useState(true);


  const [textFieldHeader, setTextFieldHeader] = useState<string>("");
  const [textFieldContent, setTextFieldContent] = useState<string>("");

  const [refresh, setRefresh] = useState(true);

  function handleFieldTextChange(e: React.FormEvent<HTMLTextAreaElement>): void {
      //setTextFieldContent(e.currentTarget.value);
  }



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



 //console.log('currentEditBlock', currentEditBlock['block_id'])

  if (currentEditBlock['block_id'] != '') {
    let headingFieldContent = ''
    let textFieldContentImp = ''

    const allBlocks = dataStoryData['ds:DataStory']['ds:Story']['ds:Block']

    // get header data
    if (allBlocks[findBlockById(currentEditBlock['block_id'])]['ds:Metadata'] !== undefined) {
      headingFieldContent = allBlocks[findBlockById(currentEditBlock['block_id'])]['ds:Metadata']['dct:title']._text
    }

    // get content data
    if (allBlocks[findBlockById(currentEditBlock['block_id'])] !== undefined) {
      textFieldContentImp = allBlocks[findBlockById(currentEditBlock['block_id'])]._text
    }

    console.log('update by set block id',textFieldContentImp)
    setTextFieldContent(textFieldContentImp)

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
  console.log('update', textFieldContent)
  //setRefresh(!refresh);
};


const editerBlockSubContent = () => {
  console.log('editerBlockSub')
}


useEffect(() => {
    console.log('useEffect', textFieldContent)
}, []);




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

            <a href="#" onClick={editerBlockSubContent}>Content</a>
            <a href="">Metadata</a>
            <a href="">Notes and Comments</a>
            <a href="">Provenance</a>
            
          </div>
          <div className="edit_workspace">
            <div id='sub_content'>

            <label htmlFor="heading">Heading
            <textarea
            name="heading"
            id="headingField"
            className="smallEditField"
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

            <div id='sub_Provenance'>
            <label htmlFor="tb">Provenance
            <textarea
              name="tb"
              id="textField"
              className="smallEditField"
            ></textarea>
            <button >Add provenance</button>
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


//<button>Content</button>
//<button>Metadata</button>
//<button>Notes and Comments</button>
//<button>Provenance</button>