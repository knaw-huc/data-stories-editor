import React, { ReactElement} from 'react';
import StoryBlockMD from "./dsStoryBlockContent_md";
import StoryBlockHeader from "./dsStoryBlockContent_storyHead";
import StoryBlockNew from "./dsStoryBlockNewBlock";
import icon_edit from '../assets/img/icons/icon-edit.svg';
import icon_delete from '../assets/img/icons/icon-delete.svg';



//const DOMParse = new DOMParser();



function StoryBlock( {contentType, contentMime, contentFromXml, blockId}: {contentType: string, contentMime: string, contentFromXml: HTMLElement, blockId: string} ): ReactElement {

  let h2Title = '';
  let contentTxt= '';

  const ifHeader = contentType === 'header';
  const ifText = contentType === 'text';

  if (ifText) {

    const metadataBlock = contentFromXml.getElementsByTagName('ds:Metadata')[0];
    if(metadataBlock !== undefined) {
      h2Title = metadataBlock.getElementsByTagName('dct:title')[0].textContent;
      metadataBlock.getElementsByTagName('dct:title')[0].textContent = '';

    }

    // remove ds:Cues
    if(contentFromXml.getElementsByTagName('ds:Cues')[0] !== undefined) {
      contentFromXml.getElementsByTagName('ds:Cues')[0].remove();
    }


    const contentBlock = contentFromXml.textContent;
    if(contentBlock !== undefined) {
      contentTxt = contentBlock.replace(/(\<!--.*?\-->)/g,'').trim();

    }
    //console.log('***',contentTxt);
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
            <StoryBlockHeader contentBody={contentFromXml} />
          ) : (
            <div></div>
          ) }

          {ifText ? (
            <StoryBlockMD contentHead={h2Title} contentBody={contentTxt} />
          ) : (
            <div><em>*{contentType}*</em></div>
          ) }



        </div>
      </div>
      <StoryBlockNew />
      </>

    )
}





export default StoryBlock;
