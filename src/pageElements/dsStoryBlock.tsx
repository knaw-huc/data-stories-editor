import React, { ReactElement} from 'react';
import StoryBlockMD from "./dsStoryBlockContent_md";
import icon_edit from '../assets/img/icons/icon-edit.svg';
import icon_delete from '../assets/img/icons/icon-delete.svg';



//const DOMParse = new DOMParser();



function StoryBlock( {contentType, contentMime, contentFromXml, blockId}: {contentType: string, contentMime: string, contentFromXml: HTMLElement, blockId: string} ): ReactElement {

  let h2Title = '';
  let contentTxt= '';

  const ifText = contentType == 'text';

  if (ifText) {
    const metadataBlock = contentFromXml.getElementsByTagName('ds:Metadata')[0];
    if(metadataBlock !== undefined) {
      h2Title = metadataBlock.getElementsByTagName('dct:title')[0].innerHTML;
      contentFromXml.getElementsByTagName('ds:Metadata')[0].remove();
    }

    // remove ds:Cues
    if(contentFromXml.getElementsByTagName('ds:Cues')[0] !== undefined) {
      contentFromXml.getElementsByTagName('ds:Cues')[0].remove();
    }


    const contentBlock = contentFromXml.innerHTML;
    if(contentBlock !== undefined) {
      contentTxt = contentBlock.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g,'').trim();

    }
    console.log('***',contentTxt);
  }



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
            <StoryBlockMD contentHead={h2Title} contentBody={contentTxt} />
          ) : (
            <div><em>... in progress {contentType}</em></div>
          ) }



        </div>
      </div>

    )
}





export default StoryBlock;
