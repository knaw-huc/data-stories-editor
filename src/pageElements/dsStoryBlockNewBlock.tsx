import React, { ReactElement } from 'react';
import {useState, useEffect} from "react";
import icon_plus from '../assets/img/icons/icon-+.svg';




function StoryBlockNew({prevId, dataStoryData, setDataStoryData}: {
  prevId: String, 
  dataStoryData: object,
  setDataStoryData: Function}): ReactElement {

  const [blockHeight, setBlockHeight] = useState({height: "0px"});

  const newEntry = {
    "_attributes": {
      "xml:id": "new",
      "type": "text",
      "mime": "text/markdown"
    },
    "_comment": "",
    "ds:Metadata": {
      "dct:title": {
        "_text": "New block"
      },
      "_comment": ""
    },
    "ds:Cues": {
      "_comment": [],
      "ds:title-prologue": {
        "_attributes": {
          "type": "template"
        },
        "_text": "# I. {$ds-Block/dct:title}"
      }
    },
    "_text": "This is a new markdown block."
  }


  function openNewBlock() {
    setBlockHeight({height: "200px"})
  }

  function closeNewBlock() {
    setBlockHeight({height: "0px"})
  }

  function addNew(newType) {

    let foundedIndex = 0;

    console.log('Add new', dataStoryData)

    dataStoryData["ds:DataStory"]["ds:Story"]["ds:Block"].map((obj, index) => {
      if (obj["_attributes"]["xml:id"] === prevId) {
        console.log('index', index)
        foundedIndex = index
      }

    });

    console.log('foundedIndex', foundedIndex)
    dataStoryData["ds:DataStory"]["ds:Story"]["ds:Block"].splice(foundedIndex+1, 0, newEntry)
    setDataStoryData(dataStoryData)
    console.log('new dataStoryData', dataStoryData)
    closeNewBlock()

  }






  useEffect(() => {
  }, [dataStoryData]);




  

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

      <div>
        <div><button onClick={closeNewBlock}>X</button></div>
      </div>
      </div>
    </div>

    )
}


export default StoryBlockNew;
