import React, { ReactElement, ReactNode } from 'react';
import icon_plus from '../assets/img/icons/icon-+.svg';




function StoryBlockNew(): ReactElement {




    return (

      <div className="dsBlock dsBlock__layout dsBlock__new">
        <div className=" dsBlock__left">
          <button type="button" name="button" className="bt_icon newBlockHandler">
            <img src={icon_plus} alt="" />
          </button>
        </div>
        <div className="dsBlock__right">
      </div>
    </div>

    )
}


export default StoryBlockNew;
