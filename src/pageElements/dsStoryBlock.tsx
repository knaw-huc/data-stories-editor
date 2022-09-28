import React, { ReactElement} from 'react';
import StoryBlockMD from "./dsStoryBlockContent_md";
import icon_edit from '../assets/img/icons/icon-edit.svg';
import icon_delete from '../assets/img/icons/icon-delete.svg';

//const DOMParse = new DOMParser();



function StoryBlock( {contentType, contentMime, contentFromXml, blockId}: {contentType: string, contentMime: string, contentFromXml: string, blockId: string} ): ReactElement {

  // const xmlBlock = DOMParse.parseFromString(contentFromXml, 'text/xml');
  // console.log(xmlBlock);
  const ifText = contentType == 'text';
  //const header = contentFromXml.getElementsByTagName('ds:Metadata') //.getElementsByTagName('dct:title').innerHTML;
  console.log(contentFromXml);






    return (

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


          {ifText ? (
            <StoryBlockMD contentHead="title" contentBody="body" />
          ) : (
            <div></div>
          ) }



        </div>
      </div>

    )
}





export default StoryBlock;
