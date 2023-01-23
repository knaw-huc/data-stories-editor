import React, { ReactElement, ReactNode } from 'react';
import {useState} from "react";
import icon_plus from '../assets/img/icons/icon-+.svg';




function StoryBlockNew({prevId}: {prevId: String}): ReactElement {

  const [blockHeight, setBlockHeight] = useState({height: "0px"});


  function openNewBlock() {
    console.log('open new', prevId)
    setBlockHeight({height: "200px"})

  }

  function addNew(newType) {
    console.log('Add new', newType)

  }


    return (

      <div className="dsBlock dsBlock__layout dsBlock__new" >
        <div className=" dsBlock__left">
          <button type="button" name="button" className="bt_icon newBlockHandler" onClick={openNewBlock}>
            <img src={icon_plus} alt="" />
          </button>
        </div>
        <div className="dsBlock__right newMenu" style={blockHeight}>
        <div>
        
        <strong>Text</strong>
        <div><button onClick={() => addNew('markdown') }>Markdown</button></div>
      </div>
  
      <div>
        <strong>Media</strong>
        <div><button onClick={() => addNew('image') }>Image</button></div>
      </div>
  
      <div>
        <strong>Query</strong>
        <div><button onClick={() => addNew('sparql') }>SPARQL</button></div>
      </div>
      </div>
    </div>

    )
}


export default StoryBlockNew;
