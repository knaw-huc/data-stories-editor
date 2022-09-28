import React from 'react';
import {useState} from "react";
import DsStoryBlock from "./dsStoryBlock";

import axios from 'axios';
const DOMParse = new DOMParser();


function Story() {
  console.log('story');

  const [storyBlocksData, setStoryBlocksData] = useState(Object);
  const [loading, setLoading] = useState(true);


  axios
    .get(
      'https://raw.githubusercontent.com/CLARIAH/data-stories/main/spec/WP4-Story.xml',
    )
    .then(response => {
      const xmlDoc = DOMParse.parseFromString(response.data, 'text/xml');
      const allBlocksHTML = xmlDoc.getElementsByTagName('ds:Block');
      const allBlocks = [].slice.call(allBlocksHTML);

      setStoryBlocksData(allBlocks);
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
