import React from 'react';
import icon_edit from '../assets/img/icons/icon-edit.svg';
import icon_delete from '../assets/img/icons/icon-delete.svg';

function StoryBlock() {
    return (

      <div className="dsBlock dsBlock__layout dsBlock__margin   ">
          <div className="dsBlock__handle revealBlock dsBlock__left">
            <button type="button" name="button" className="bt_icon block_event">
              <img src={icon_edit} alt="" />
            </button>
            <button type="button" name="button" className="bt_icon">
              <img src={icon_delete} alt="" />
            </button>
          </div>
          <div className="dsBlock__content dsBlock__right">

          <h1>The 1918-19 flu epidemic in The Netherlands</h1>
          <p>By <em>Thomas de Groot</em> and <em>Wouter Beek</em> <br/>
          <small><a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA</a></small></p>
        </div>
      </div>

    )
}

export default StoryBlock;
