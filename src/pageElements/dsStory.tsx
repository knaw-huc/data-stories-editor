import React from 'react';
import {useState} from "react";
import DsStoryBlock from "./dsStoryBlock";

import axios from 'axios';
const DOMParse = new DOMParser();


function Story() {
  console.log('story');

  const [storyBlocksData, setStoryBlocksData] = useState(Object);
  // const [storyTitle, setStoryTitle] = useState(String);
  // const [storyAuthors, setStoryAuthors] = useState([]);
  // const [storyCopyright, setCopyright] = useState(String);
  const [loading, setLoading] = useState(true);
  //let allBlocksHTML = [];





  axios
    .get(
      'https://raw.githubusercontent.com/CLARIAH/data-stories/main/spec/WP4-Story.xml',
    )
    .then(response => {
      const xmlDoc = DOMParse.parseFromString(response.data, 'text/xml');


      //const storyTitle = '<h1>'+xmlDoc.getElementsByTagName('dct:title')[0].innerHTML+'</h1>';


      const allBlocksHTML = xmlDoc.getElementsByTagName('ds:Block');
      const allBlocks = [].slice.call(allBlocksHTML);


      setStoryBlocksData(allBlocks);
      //setStoryTitle(storyTitle);
      //setStoryAuthors();
      //setCopyright();
      setLoading(false);





    })
    .catch(err => console.log(err));


    return (

        <div className="dataStoryBlocks">




        {!loading ? (
          storyBlocksData.map((item, index) => {
              return (

                <DsStoryBlock
                  blockId={item.getAttribute('xml:id')}
                  contentType={item.getAttribute('type')}
                  contentMime={item.getAttribute('mime')}
                  contentFromXml={item}
                  ></ DsStoryBlock>

              )
            })
        ):
          (<div className="">Loading...</div>)
         }
        </div>




    )
}

export default Story;
