import React from 'react';
import {useState, useEffect} from "react";
import DsStoryBlock from "./dsStoryBlock";
import DsEditor from "./dsEditor";

import axios from 'axios';
import convert from 'xml-js';



function Story() {

  const [storyHeader, setStoryHeader] = useState(Object);
  const [storyBlocksData, setStoryBlocksData] = useState(Object);
  const [loading, setLoading] = useState(true);
  const [currentEditBlock, setCurrentEditBlock] = useState({"block_id":""});

  const [dataStoryData, setDataStoryData] = useState({
    "_declaration": {},
    "_instruction": {},
    "ds:DataStory": {}
  });


if (Object.keys(dataStoryData["ds:DataStory"]).length === 0) {
  fetch_data();
}


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
    const allBlocks = data['ds:DataStory']['ds:Story']['ds:Block'];
    setStoryBlocksData(allBlocks);


  }



    useEffect(() => {
      console.log('useEffect story currentEditBlock', currentEditBlock)
    }, [loading,dataStoryData]); //, currentEditBlock


    return (
      <>


        <div className="dataStoryBlocks">


        {!loading ? (
            <DsStoryBlock
              content={storyHeader}
              contentType="header"
              dataStoryData={dataStoryData}
              setCurrentEditBlock={setCurrentEditBlock}
              setDataStoryData = {setDataStoryData}
              ></ DsStoryBlock>

        ):
          (<div className="">Loading header</div>)
         }

         {!loading ? (
           storyBlocksData.map((item, index) => {
               return (

                 <DsStoryBlock
                 content={item}
                 contentType={item._attributes.type}
                 dataStoryData={dataStoryData}
                 setCurrentEditBlock={setCurrentEditBlock}
                 setDataStoryData = {setDataStoryData}
                   ></ DsStoryBlock>

               )
             })
         ):
           (<div className="">Loading storyblocks</div>)
          }



        </div>

        <DsEditor
        all={dataStoryData}
        currentEditBlock={currentEditBlock}
        dataStoryData={dataStoryData}
        setDataStoryData={setDataStoryData}
        />
        </>




    )
}

export default Story;
