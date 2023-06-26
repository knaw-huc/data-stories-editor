import React from 'react';
import {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import DsStoryBlock from "./dsStoryBlock";
import DsEditor from "./dsEditor";
import ModalOpenFile from "./modalOpenFile";
import YasguiBlock from "./yasguiBlock";




import axios from 'axios';
import convert from 'xml-js';


function Story() {
  const navigate = useNavigate();
  const params = useParams();
  const store = params.store as string;
  let xmlFile = '';
  if (store !== undefined) {
      xmlFile = 'WP4-Story.xml';
  } else {
      xmlFile = 'new_datastory.xml';
  }

  const [storyHeader, setStoryHeader] = useState(Object);
  const [loading, setLoading] = useState(true);
  const [currentEditBlock, setCurrentEditBlock] = useState({"block_id":""});
  const [editorStatus, setEditorStatus] = useState(true);
  const [showOpenDialog, setShowOpenDialog] = useState(false);
  const [currentDataStory, setCurrentDataStory] = useState(xmlFile);
  const [contentType, setContentType] = useState<string>("");

  //console.log('currentDataStory', currentDataStory);
  
  

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
              '/datastory_files/'+currentDataStory,
          )
          .then(response => {

            convertXml(response.data)
            .then(checkDataStoryData)
            .then(setDataElements)

            setLoading(false);
            //console.log('@@',dataStoryData);
            
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
    //console.log('useEffect story currentEditBlock', currentEditBlock)
  }, [dataStoryData, currentEditBlock,currentDataStory]); 



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
        setCurrentDataStory={setCurrentDataStory}
        setDataStoryData = {setDataStoryData}
        setLoading={setLoading}
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
