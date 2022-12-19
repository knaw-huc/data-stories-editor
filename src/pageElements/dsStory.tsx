import React from 'react';
import {useState, useEffect} from "react";
import DsStoryBlock from "./dsStoryBlock";
import DsEditor from "./dsEditor";

import axios from 'axios';
import convert from 'xml-js';

//window.name = "John";


// export interface dataStoryRoot {
//   "_declaration": {},
//   "_instruction": {},
//   "ds:DataStory": {}
// }



function Story() {

  const [storyHeader, setStoryHeader] = useState(Object);
  const [storyBlocksData, setStoryBlocksData] = useState(Object);
  const [loading, setLoading] = useState(true);
  const [currentEditBlock, setCurrentEditBlock] = useState('');

  const [dataStoryData, setDataStoryData] = useState({
    "_declaration": {},
    "_instruction": {},
    "ds:DataStory": {}
  });





if (Object.keys(dataStoryData["ds:DataStory"]).length === 0) {

  fetch_data();
} else{
  //setDataElements(dataStoryData);
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
        //console.log('convertXml',dataStoryDataRaw)
            resolve(dataStoryDataRaw);
      })
  }


function checkDataStoryData(data) {
  return new Promise((resolve, reject) => {
    //console.log('checkDataStoryData',data)
    setDataStoryData(data)
        resolve(data);
      })
}

  function setDataElements(data) {
    //console.log('setDataElements')
    setStoryHeader(data['ds:DataStory']['ds:Metadata']);

    const allBlocks = data['ds:DataStory']['ds:Story']['ds:Block'];

    //console.log('Storyblocks',allBlocks[0]._attributes.mime)
    setStoryBlocksData(allBlocks);


  }



    useEffect(() => {
      //console.log('useEffect')
      console.log('useEffect currentEditBlock', currentEditBlock)

    }, [loading, currentEditBlock]);


    return (
      <>


        <div className="dataStoryBlocks">


        {!loading ? (
            <DsStoryBlock
              content={storyHeader}
              contentType="header"
              all={dataStoryData}
              setCurrentEditBlock={setCurrentEditBlock}
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
                 all={dataStoryData}
                 setCurrentEditBlock={setCurrentEditBlock}
                   ></ DsStoryBlock>

               )
             })
         ):
           (<div className="">Loading storyblocks</div>)
          }



        </div>

        <DsEditor
        all={dataStoryData}
        curr={currentEditBlock}
        dataStoryData={dataStoryData}
        setDataStoryData={setDataStoryData}
        />
        </>




    )
}

export default Story;

// {!loading ? (
//   <DsStoryBlock
//     content={storyHeader}
//     contentType="header"
//     ></ DsStoryBlock>
// ):(
//   <></>
// )}


// async function fetch_data() {
//     axios
//         .get(
//             'https://raw.githubusercontent.com/CLARIAH/data-stories/main/spec/WP4-Story.xml',
//         )
//         .then(response => {
//
//           var xmlll = new XMLParser().parseFromString(response.data);
//           // console.log(xmlll);
//
//             const xmlDoc = DOMParse.parseFromString(response.data, 'text/xml');
//
//
//
//
//             // content blocks
//             const allBlocksHTML = xmlDoc.getElementsByTagName('ds:Block');
//             const allBlocks = [].slice.call(allBlocksHTML);
//
//             setStoryHeader(xmlDoc.getElementsByTagName('ds:DataStory')[0].getElementsByTagName('ds:Metadata')[0]);
//             setStoryBlocksData(allBlocks);
//             setLoading(false);
//
//         })
//         .catch(err => console.log(err));
// }




// {!loading ? (
//   storyBlocksData.map((item, index) => {
//       return (
//
//         <DsStoryBlock
//             key={index}
//           blockId={item.getAttribute('xml:id')}
//           contentType={item.getAttribute('type')}
//           contentMime={item.getAttribute('mime')}
//           contentFromXml={item}
//           ></ DsStoryBlock>
//
//       )
//     })
// ):
//   (<div className="">Loading...</div>)
//  }
