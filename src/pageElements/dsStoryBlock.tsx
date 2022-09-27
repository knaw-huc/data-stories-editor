import React, { ReactElement, ReactNode } from 'react';
import icon_edit from '../assets/img/icons/icon-edit.svg';
import icon_delete from '../assets/img/icons/icon-delete.svg';





function StoryBlock( {contentType, contentMime, contentFromXml, blockId}: {contentType: string, contentMime: string, contentFromXml: string, blockId: string} ): ReactElement {
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

          {contentType}<br/>
          {contentMime}<br/>
          {contentFromXml}<br/>
        </div>
      </div>

    )
}





export default StoryBlock;
