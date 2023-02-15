import React from 'react';
import {useState, useEffect} from "react";
import DsStoryBlock from "./dsStoryBlock";
import DsEditor from "./dsEditor";
import ModalOpenFile from "./modalOpenFile";



import axios from 'axios';
import convert from 'xml-js';


function Story() {


  
  const [storyHeader, setStoryHeader] = useState(Object);
  const [loading, setLoading] = useState(true);
  const [currentEditBlock, setCurrentEditBlock] = useState({"block_id":""});
  const [editorStatus, setEditorStatus] = useState(false);
  const [showOpenDialog, setShowOpenDialog] = useState(false);
  

  const [dataStoryData, setDataStoryData] = useState({
    "_declaration": {},
    "_instruction": {},
    "ds:DataStory": {}
  });


if (Object.keys(dataStoryData["ds:DataStory"]).length === 0) {
  fetch_data();
}

//https://raw.githubusercontent.com/CLARIAH/data-stories/main/spec/WP4-Story.xml
  async function fetch_data() {
      axios
          .get(
              'https://raw.githubusercontent.com/CLARIAH/data-stories/main/spec/WP4-Story.xml',
          )
          .then(response => {

            convertXml(response.data)
            .then(checkDataStoryData)
            .then(setDataElements)

            setLoading(false);
          })
          .catch(err => console.log(err));
  }



  


  function convertXml(xmlString) {
      return new Promise((resolve, reject) => {
        let dataStoryDataRaw = convert.xml2js(xmlString, {compact: true})
            resolve(dataStoryDataRaw);
      })
  }


function checkDataStoryData(data) {
  return new Promise((resolve, reject) => {
    setDataStoryData(data)
        resolve(data);
      })
}

  function setDataElements(data) {
    setStoryHeader(data['ds:DataStory']['ds:Metadata']);
  }



  useEffect(() => {
    console.log('useEffect story currentEditBlock', currentEditBlock)
  }, [dataStoryData, currentEditBlock]); 



    return (
      <>


        <div className="dataStoryBlocks">


        {!loading ? (
            <DsStoryBlock
              content={storyHeader}
              contentType="header"
              dataStoryData={dataStoryData}
              currentEditBlock={currentEditBlock}
              setCurrentEditBlock={setCurrentEditBlock}
              setDataStoryData = {setDataStoryData}
              setEditorStatus={setEditorStatus}
              editorStatus={editorStatus}
              ></ DsStoryBlock>

        ):
          (<div className="dsBlock"></div>)
         }

         {!loading ? (
           dataStoryData['ds:DataStory']['ds:Story']['ds:Block'].map((item, index) => {
               return (

                 <DsStoryBlock
                 content={item}
                 contentType={item._attributes.type}
                 dataStoryData={dataStoryData}
                 currentEditBlock={currentEditBlock}
                 setCurrentEditBlock={setCurrentEditBlock}
                 setDataStoryData = {setDataStoryData}
                 setEditorStatus={setEditorStatus}
                 editorStatus={editorStatus}
                   ></ DsStoryBlock>

               )
             })
         ):
           (<div className="dsBlock">Loading storyblocks</div>)
          }



        </div>

        <ModalOpenFile
        showOpenDialog={showOpenDialog}
        setShowOpenDialog={setShowOpenDialog}
        />


        <DsEditor
        currentEditBlock={currentEditBlock}
        setCurrentEditBlock={setCurrentEditBlock}
        dataStoryData={dataStoryData}
        setDataStoryData={setDataStoryData}
        setEditorStatus={setEditorStatus}
        editorStatus={editorStatus}
        showOpenDialog={showOpenDialog}
        setShowOpenDialog={setShowOpenDialog}
        />
        
        </>




    )
}

export default Story;
