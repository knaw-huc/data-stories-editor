import React, { ReactElement} from 'react';
import {useEffect} from "react";
import StoryBlockMD from "./dsStoryBlockContent_md";
import StoryBlockTable from "./dsStoryBlockContent_table";
import StoryBlockImage from "./dsStoryBlockContent_image";
import StoryBlockHeader from "./dsStoryBlockContent_storyHead";
import StoryBlockNew from "./dsStoryBlockNewBlock";
import icon_edit from '../assets/img/icons/icon-edit.svg';
import icon_delete from '../assets/img/icons/icon-delete.svg';




function StoryBlock( {content, contentType, dataStoryData, currentEditBlock, setCurrentEditBlock, setDataStoryData, setEditorStatus, editorStatus, deleteStoryBlockByID}: {
  content: object, 
  contentType: String, 
  dataStoryData: object, 
  currentEditBlock: object,
  setCurrentEditBlock: Function,
  setDataStoryData: Function,
  setEditorStatus: Function,
  editorStatus: boolean,
  deleteStoryBlockByID: Function} ): ReactElement {




  const ifHeader = contentType === 'header';
  const ifText = contentType === 'text';
  const ifQuery = contentType === 'query';
  const ifImage = contentType === 'media';

  let h2Title = '';
  let contentTxt =''
  let blockId = ''
  let imgHref = ''


  if (ifHeader) {
    blockId = 'pageHeader'  //
  }

  if (ifText) {
    blockId = content['_attributes']["xml:id"]  //

    if (content['ds:Metadata'] !== undefined) {
      h2Title = content['ds:Metadata']['dct:title']._text
    }
    contentTxt = content['_text'];
  }
  
  if (ifQuery) {
    blockId = content['_attributes']["xml:id"]  //
  }

  if (ifImage) {
    blockId = content['_attributes']["xml:id"]  //
    imgHref = content['_attributes']["href"]
    if (content['ds:Metadata'] !== undefined) {
      h2Title = content['ds:Metadata']['dct:title']._text
    }
  }


  function changeCurEdit() {
    setCurrentEditBlock({block_id: blockId})
    setEditorStatus(true)
  }

  function deleteCurBlock() {

  }


  useEffect(() => {
  }, [dataStoryData,currentEditBlock]);


    return (
      <>

      <div className="dsBlock dsBlock__layout dsBlock__margin" >
          <div className="dsBlock__handle revealBlock dsBlock__left">
            <button type="button" name="button" className="bt_icon block_event" onClick={changeCurEdit} >
              <img src={icon_edit} alt="" />
            </button>
            <button type="button" name="button"  className="bt_icon" onClick={() => {
              if (window.confirm("Delete data story block?")) {
                  deleteStoryBlockByID(blockId);
              }
            }}>
              <img src={icon_delete} alt="" />
            </button>
          </div>
          <div className="dsBlock__content dsBlock__right" id={blockId}>


            {ifHeader ? (
              <StoryBlockHeader contentHeader={content} />
            ) : (
              <></>
            ) }

            {ifText ? (
              <StoryBlockMD contentHead={h2Title} contentBody={contentTxt} />
            ) : (
              <></>
            ) }

            {ifQuery ? (
              <StoryBlockTable />
            ) : (
              <></>
            ) }
            {ifImage ? (
              <StoryBlockImage 
              title={h2Title}
              href={imgHref}
              />
            ) : (
              <></>
            ) }



        </div>
      </div>
      <StoryBlockNew 
        prevId={blockId}
        dataStoryData={dataStoryData}
        setDataStoryData={setDataStoryData}
        setCurrentEditBlock={setCurrentEditBlock}
        />
      </>

    )
}





export default StoryBlock;