import React from 'react';
import {useState, useEffect} from "react";
import icon_arrowDown from '../assets/img/icons/icon-arrow-down.svg';


function DsEditor({all, currentEditBlock, dataStoryData, setDataStoryData, setEditorStatus, editorStatus}: {
  all: object, 
  currentEditBlock:object, 
  dataStoryData: object, 
  setDataStoryData: Function,
  setEditorStatus: Function,
  editorStatus: boolean} ) {

  
  
  const [style, setStyle] = useState("panel_edit fixedBottom editorDown");
  const [editorUp, setEditorUp] = useState(true);
  const [editorSection, setEditorSection] = useState('content');
  const [textFieldHeader, setTextFieldHeader] = useState<string>("");
  const [textFieldContent, setTextFieldContent] = useState<string>("");
  const [refresh, setRefresh] = useState(true);

  function handleFieldTextChange(e: React.FormEvent<HTMLTextAreaElement>): void {
      setTextFieldContent(e.currentTarget.value);
  }
  function handleFieldHeaderChange(e: React.FormEvent<HTMLTextAreaElement>): void {
    setTextFieldHeader(e.currentTarget.value);
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

    const allBlocks = dataStoryData['ds:DataStory']['ds:Story']['ds:Block']

    // get header data
    if (allBlocks[findBlockById(currentEditBlock['block_id'])]['ds:Metadata'] !== undefined) {
      headingFieldContent = allBlocks[findBlockById(currentEditBlock['block_id'])]['ds:Metadata']['dct:title']._text
    }

    // get content data
    if (allBlocks[findBlockById(currentEditBlock['block_id'])] !== undefined) {
      textFieldContentImp = allBlocks[findBlockById(currentEditBlock['block_id'])]._text
    }

    //console.log('update by set block id',textFieldContentImp)
    setTextFieldContent(textFieldContentImp)
    setTextFieldHeader(headingFieldContent)

    

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
  console.log('update', textFieldContent)
  
};

// submenu interface
const editerBlockSubContent = (sub) => {
  console.log('editerBlockSub', sub)
  document.getElementById('sub_content').style.display='none';
  document.getElementById('sub_metadata').style.display='none';
  document.getElementById('sub_notes').style.display='none';
  document.getElementById('sub_provenance').style.display='none';

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
}


useEffect(() => {
    console.log('useEffect block', textFieldContent)
    setFields()
    changeStyle()
    editerBlockSubContent('content')
    
}, [dataStoryData,currentEditBlock, refresh]);




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

            <a href="#" onClick={() => editerBlockSubContent('content')}>Content</a>
            <a href="#" onClick={() => editerBlockSubContent('metadata')}>Metadata</a>
            <a href="#" onClick={() => editerBlockSubContent('notes')}>Notes and Comments</a>
            <a href="#" onClick={() => editerBlockSubContent('provenance')}>Provenance</a>
            
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