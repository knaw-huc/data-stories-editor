import React, { ReactElement} from 'react';
import StoryBlockMD from "./dsStoryBlockContent_md";
import StoryBlockTable from "./dsStoryBlockContent_table";
import StoryBlockHeader from "./dsStoryBlockContent_storyHead";
import StoryBlockNew from "./dsStoryBlockNewBlock";
import icon_edit from '../assets/img/icons/icon-edit.svg';
import icon_delete from '../assets/img/icons/icon-delete.svg';




function StoryBlock( {content, contentType, all}: {content: object, contentType: String, all: object} ): ReactElement {
  console.log('contenttype',content)

  const ifHeader = contentType === 'header';
  const ifText = contentType === 'text';
  const ifQuery = contentType === 'query';

  let h2Title = '';
  let contentTxt =''
  let blockId = ''

  if (ifText) {
    blockId = content['_attributes']["xml:id"]  //

    if (content['ds:Metadata'] !== undefined) {
      h2Title = content['ds:Metadata']['dct:title']._text
    }
    contentTxt = content['_text'];
  }






    return (
      <>

      <div className="dsBlock dsBlock__layout dsBlock__margin" id={blockId}>
          <div className="dsBlock__handle revealBlock dsBlock__left">
            <button type="button" name="button" className="bt_icon block_event">
              <img src={icon_edit} alt="" />
            </button>
            <button type="button" name="button" className="bt_icon">
              <img src={icon_delete} alt="" />
            </button>
          </div>
          <div className="dsBlock__content dsBlock__right">


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



        </div>
      </div>
      <StoryBlockNew />
      </>

    )
}





export default StoryBlock;
